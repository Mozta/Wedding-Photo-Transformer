import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3001;

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Rate limiting - simple in-memory store
const requestCounts = new Map();
const RATE_LIMIT = 5; // max requests per minute per IP
const RATE_WINDOW = 60 * 1000; // 1 minute

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowStart = now - RATE_WINDOW;

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const timestamps = requestCounts.get(ip).filter(t => t > windowStart);
  requestCounts.set(ip, timestamps);

  if (timestamps.length >= RATE_LIMIT) {
    return res.status(429).json({
      error: '¡Demasiadas solicitudes! Espera un momento antes de intentar de nuevo. 💒'
    });
  }

  timestamps.push(now);
  next();
}

// Prompts
const PROMPTS = {
  romantic: `Transform this photo into a beautiful and elegant wedding scene. 
CRITICAL: Keep the exact same people, their faces, skin tones, expressions, and body positions completely unchanged and recognizable. Do not alter their facial features at all.
Add elegant wedding attire: a gorgeous white wedding dress with a delicate lace veil for one person and a sharp formal black tuxedo with a white boutonniere for the other person. 
Add a romantic wedding backdrop with soft warm bokeh lights, lush flower arrangements of white roses and peonies, and a beautiful floral wedding arch behind them. 
Add subtle wedding rings on their ring fingers. 
The overall style should be warm, romantic, and celebratory — like a professional wedding photograph taken by a high-end photographer. 
Use soft golden hour lighting. Maintain photorealistic quality throughout.`,

  funny: `Transform this couple's photo into the most hilariously over-the-top, extravagant wedding scene imaginable.
CRITICAL: Keep their exact faces, skin tones, and expressions completely unchanged and recognizable. Do not alter their facial features at all.
Dress one person in an incredibly extravagant white wedding gown with an enormous poofy veil trailing dramatically, and the other in a flashy sparkly tuxedo with an oversized bow tie.
Add a dramatic and ornate church or castle backdrop with golden decorations everywhere, confetti and glitter raining down, white doves flying in the background, and heart-shaped rose petals floating everywhere.
Add comically large wedding rings that sparkle with exaggerated diamonds.
Make it look like the most epic, over-the-top wedding photo ever taken. Keep it fun, joyful, and celebratory.
Photorealistic style but with maximum drama and extravagance.`
};

// Transform endpoint
app.post('/api/transform', rateLimit, async (req, res) => {
  try {
    const { image, style = 'romantic' } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No se proporcionó imagen' });
    }

    const prompt = PROMPTS[style] || PROMPTS.romantic;

    // Remove data URL prefix if present and detect mime type
    const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
    const extension = mimeType.split('/')[1] || 'png';
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Create a File object from the buffer (required by OpenAI SDK)
    const imageFile = new File([imageBuffer], `photo.${extension}`, { type: mimeType });

    console.log(`🏩 Processing ${style} wedding transformation...`);
    console.log(`📷 Image size: ${(imageBuffer.length / 1024).toFixed(1)} KB, type: ${mimeType}`);

    const response = await openai.images.edit({
      model: 'gpt-image-1',
      image: imageFile,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'medium',
    });

    // The response contains base64 image data
    const resultImage = response.data[0];
    
    if (resultImage.b64_json) {
      res.json({
        success: true,
        image: `data:image/png;base64,${resultImage.b64_json}`,
      });
    } else if (resultImage.url) {
      res.json({
        success: true,
        imageUrl: resultImage.url,
      });
    } else {
      throw new Error('No image data in response');
    }

    console.log('✅ Transformation complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.error) console.error('❌ Error details:', JSON.stringify(error.error, null, 2));
    
    if (error.status === 400) {
      return res.status(400).json({
        error: 'La imagen no pudo ser procesada. Intenta de nuevo con otra foto. 📸'
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Demasiadas solicitudes al API. Espera unos segundos. ⏳'
      });
    }

    if (error.status === 401) {
      return res.status(401).json({
        error: 'API key inválida o expirada. Revisa tu archivo .env 🔑'
      });
    }

    res.status(500).json({
      error: 'Error al transformar la imagen. Intenta de nuevo. 💔'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '💒 Wedding transformer ready!' });
});

app.listen(PORT, () => {
  console.log(`\n💒 Wedding Photo Server running on http://localhost:${PORT}`);
  console.log(`🏩 Ready to transform couples into newlyweds!\n`);
});
