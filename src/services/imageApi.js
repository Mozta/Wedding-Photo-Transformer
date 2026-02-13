const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function transformImage(imageBase64, style = 'romantic') {
  try {
    const response = await fetch(`${API_URL}/api/transform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
        style: style,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error del servidor (${response.status})`);
    }

    const data = await response.json();

    if (data.success && data.image) {
      return data.image;
    } else if (data.success && data.imageUrl) {
      return data.imageUrl;
    } else {
      throw new Error('No se recibió imagen del servidor');
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('No se puede conectar al servidor. ¿Está corriendo el backend? 🔌');
    }
    throw error;
  }
}
