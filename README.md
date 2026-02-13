# 💒 Wedding Photo Transformer

Aplicación web que usa la cámara para tomar fotos y transformarlas en escenas de boda usando IA (OpenAI `gpt-image-1`). Hecha con amor para el 14 de febrero. 💕

## ✨ Características

- 📸 Captura de fotos con webcam en tiempo real
- 🎨 Transformación con IA en dos estilos: **Romántico** y **Divertido**
- 💾 Descarga de la imagen transformada
- 🎉 Animaciones de confetti y corazones flotantes
- 📱 Diseño responsivo con estética glassmorphism

## 🛠️ Tech Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite 7 |
| Backend | Express 5 (Node.js) |
| IA | OpenAI API (`gpt-image-1`) |
| Webcam | react-webcam |

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- Una API key de [OpenAI](https://platform.openai.com/api-keys) con acceso a `gpt-image-1`

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd wedding
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# OpenAI API Key
OPENAI_API_KEY=sk-proj-tu-api-key-aqui

# Puerto del servidor backend (opcional, default: 3001)
PORT=3001
```

## ▶️ Ejecución

Necesitas **dos terminales** para correr el proyecto:

### Terminal 1 — Backend (servidor Express)

```bash
npm run server
```

Verás:
```
💒 Wedding Photo Server running on http://localhost:3001
🏩 Ready to transform couples into newlyweds!
```

### Terminal 2 — Frontend (Vite dev server)

```bash
npm run dev
```

Verás:
```
VITE v7.3.1  ready in ~1s
➜  Local: http://localhost:5173/
```

### 4. Abrir la app

Abre http://localhost:5173/ en tu navegador. 🎉

## 📁 Estructura del proyecto

```
wedding/
├── server.js          # Backend Express (proxy a OpenAI API)
├── src/
│   ├── App.jsx        # Componente principal
│   ├── components/    # Componentes React (Webcam, Preview, Result, etc.)
│   └── services/
│       └── imageApi.js  # Cliente API para conectar al backend
├── .env               # Variables de entorno (no incluido en git)
├── package.json
└── vite.config.js
```

## 🔧 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el frontend (Vite) |
| `npm run server` | Inicia el backend (Express) |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint |

## 📝 Notas

- El navegador pedirá permiso para acceder a la cámara
- La API key **nunca** se expone al frontend; todas las llamadas a OpenAI pasan por el backend
- Hay un rate limit de 5 transformaciones por minuto por IP

---

Hecho con 💕 para el 14 de febrero · Lab Edition
