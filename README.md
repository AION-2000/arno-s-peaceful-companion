# 🌿 Arno's Peaceful Companion

> A compassionate, AI-powered digital sanctuary for emotional wellness and stress management.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?logo=google)](https://ai.google.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)

---

## 📖 Overview

**Arno's Peaceful Companion** is a modern web application designed to provide a safe, judgment-free space for emotional processing and mental wellness. Built with empathy at its core, this platform combines cutting-edge AI technology with evidence-based therapeutic techniques to support users through moments of stress, anxiety, and overwhelm.

### 🎯 Core Philosophy

Mental health support should be:
- **Accessible** – Available whenever you need it, wherever you are
- **Personal** – Tailored to individual emotional needs
- **Non-judgmental** – A safe space without fear of criticism
- **Multi-modal** – Engaging different senses and cognitive pathways

---

## ✨ Features

### 🤖 AI-Powered Modules

#### ❤️ Heart to Heart (Vent Room)
An empathetic conversational AI that serves as your supportive companion, "Aion." Powered by Google Gemini's advanced language models, it provides:
- Active listening with emotional validation
- Supportive responses without unsolicited advice
- Optional voice-to-text input for natural expression

#### 🧘 Soul (Guided Meditation)
Dynamic meditation script generation tailored to your current emotional state:
- **Anger Management** – Cooling techniques and perspective-building
- **Calm & Focus** – Grounding exercises for anxiety
- **Sleep Preparation** – Progressive relaxation for restful nights
- **Self-Love** – Compassionate affirmations and body scanning

#### 🎨 Boost (Serenity Generator)
Real-time AI image generation creating peaceful visual scenes:
- Cozy cabins in misty forests
- Playful kittens and serene animals
- Tranquil nature landscapes
- Customizable prompts for personal preferences

### 🧘‍♂️ Therapeutic Tools

#### 🌬️ Breathe (Box Breathing)
Interactive breathing guide implementing the 4-4-4-4 technique:
- Visual animations synchronized with breath cycles
- Gentle audio cues for timing
- Proven method for activating parasympathetic nervous system

#### 🌊 Zen Garden
Physics-based interactive canvas built with D3.js:
- Drag particles to create flowing patterns
- Tactile grounding for sensory regulation
- Mesmerizing visuals for focus and calm

#### ✨ Glow (Affirmations)
Curated collection of gentle reminders:
- Rotating carousel of positive affirmations
- Personalized messages of support
- Daily emotional reinforcement

#### 🎶 Soundscape
Customizable ambient audio mixer:
- **Rain** – Gentle rainfall for relaxation
- **Forest** – Rustling leaves and woodland ambiance
- **Ocean** – Rhythmic waves for grounding
- **Birds** – Morning songbirds for uplift
- Individual volume controls and mixing capabilities

#### ☀️ Daily Intentions
Soft-entry system for starting your day:
- Morning greeting with intention-setting prompt
- Positive framing to establish mindful tone
- Optional skip for immediate access

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 | Modern, component-based UI |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **UI Patterns** | Glassmorphism | Soft, calming aesthetic |
| **AI Engine** | Google Gemini API | Natural language & image generation |
| **Visualization** | D3.js | Interactive physics simulation |
| **Build Tool** | Vite | Fast development & optimized builds |
| **Hosting** | Vercel | Serverless deployment platform |

### AI Models Used
- **Text Generation**: `gemini-2.0-flash-exp` (Conversational AI & Meditations)
- **Image Generation**: `gemini-2.0-flash-image` (Serenity visuals)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/arnos-peaceful-companion.git
   cd arnos-peaceful-companion
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   > Note: `--legacy-peer-deps` is required due to React 19 peer dependency resolutions.

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

---

## 🌐 Deployment

### Deploying to Vercel

This project is optimized for Vercel's platform. Follow these steps:

1. **Push to Git repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click "New Project" and import your repository
   - Vercel will auto-detect Vite configuration

3. **Configure environment variables**
   - In Project Settings → Environment Variables
   - Add: `VITE_GEMINI_API_KEY` with your API key
   - Apply to: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `your-project.vercel.app`

### Manual Deployment Configuration

The included `vercel.json` handles build configuration:

```json
{
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🔒 Privacy & Security

### Data Handling
- **No Server-Side Storage**: Conversations are ephemeral and not stored
- **Local Preferences**: Theme settings stored in browser localStorage
- **API Communication**: Direct client-to-Gemini API calls (end-to-end encrypted)

### Permissions
- **Microphone Access**: Required only for voice-to-text in Vent Room
  - Audio processed locally via Web Speech API
  - No audio recordings are saved or transmitted
  - Permission can be revoked anytime in browser settings

### Security Considerations
⚠️ **Important**: This implementation exposes the Gemini API key client-side. For production use with untrusted users, implement a backend proxy to protect API credentials.

---

## 📁 Project Structure

```
arnos-peaceful-companion/
├── public/
│   ├── audio/              # Soundscape audio files
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── HeartToHeart.jsx    # Vent room AI chat
│   │   ├── Breathe.jsx         # Box breathing guide
│   │   ├── Soul.jsx            # Guided meditations
│   │   ├── Glow.jsx            # Affirmations carousel
│   │   ├── ZenGarden.jsx       # D3.js interactive canvas
│   │   ├── Boost.jsx           # Image generation
│   │   └── Soundscape.jsx      # Ambient mixer
│   ├── utils/
│   │   └── gemini.js           # API integration
│   ├── App.jsx                 # Main application
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables (create this)
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

---

## 🎨 Customization

### Theming

The app supports adaptive dark/light modes with glassmorphism effects. Modify theme colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adding Affirmations

Edit the affirmations array in `src/components/Glow.jsx`:

```javascript
const affirmations = [
  "You are worthy of peace and happiness.",
  "Your custom affirmation here.",
  // Add more...
];
```

### Custom Soundscapes

Add audio files to `public/audio/` and update the `sounds` object in `src/components/Soundscape.jsx`.

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: `npm install` fails with peer dependency errors  
**Solution**: Always use `npm install --legacy-peer-deps`

**Issue**: API requests fail with 401 Unauthorized  
**Solution**: Verify your `VITE_GEMINI_API_KEY` is correctly set in `.env`

**Issue**: Audio files not playing  
**Solution**: Ensure audio files are in `public/audio/` and paths are correct

**Issue**: Voice input not working  
**Solution**: Check browser permissions and ensure HTTPS (required for microphone access)

### Browser Compatibility

- **Recommended**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Voice Input**: Requires browsers supporting Web Speech API (Chrome, Edge, Safari)
- **Audio Mixing**: Works best in Chromium-based browsers

---

## 🤝 Contributing

Contributions are welcome! This project is built with care for mental wellness, so please:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Maintain the compassionate tone in all user-facing text
- Ensure accessibility (keyboard navigation, screen readers)
- Test features in both light and dark modes
- Respect `prefers-reduced-motion` for animations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for providing advanced AI capabilities
- **Tailwind CSS** for beautiful, responsive styling
- **D3.js** for powerful data visualization
- **React Community** for excellent documentation and support
- **Arno** – for being the inspiration behind this sanctuary

---

## 💬 Disclaimer

**Important**: This application is designed as a supportive tool for emotional wellness and is **not a replacement for professional mental health care**. If you are experiencing a mental health crisis, please contact:

- **National Suicide Prevention Lifeline** (US): 988
- **Crisis Text Line** (US): Text HOME to 741741
- **International Association for Suicide Prevention**: [https://www.iasp.info/resources/Crisis_Centres/](https://www.iasp.info/resources/Crisis_Centres/)

---

## 📬 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/AION-2000/arnos-peaceful-companion/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AION-2000/arnos-peaceful-companion/discussions)
- **Email**: aionshihabshahriar@gmail.com

---

<div align="center">

**Made with 💙 for emotional wellness**

*"I've got you."*

</div>
