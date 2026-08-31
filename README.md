# Muhammad Hassan — Portfolio

Modern, dark + neon-accented portfolio for **Muhammad Hassan — Shopify Expert & Theme Developer**.
Built with **Vite + React**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features
- Sleek dark UI with neon cyan / purple / pink accents
- Glassmorphism cards, gradient typography, animated grid background
- Smooth scroll, sticky nav with active-section highlight
- Mobile-responsive with animated drawer menu
- Scroll-triggered fade/slide reveals (Framer Motion)
- Form validation (name, email format, message)
- Project cards with hover micro-interactions
- Accessible, semantic HTML

## 🚀 Getting started

```bash
cd portfolio
npm install
npm run dev
```

Then open http://localhost:5173

## 📦 Build

```bash
npm run build
npm run preview
```

## 🗂 Structure
```
src/
  components/
    Navbar.jsx
    Hero.jsx
    Services.jsx
    Portfolio.jsx
    About.jsx
    Contact.jsx
    Footer.jsx
  data.js          # All content lives here — easy to edit
  App.jsx
  main.jsx
  index.css        # Tailwind + global styles
```

## 🎨 Customize
- Edit `src/data.js` for nav, services, projects, tech stack, stats, socials.
- Theme colors in `tailwind.config.js` (cyan / purple / pink / green).
- Fonts: Space Grotesk, Inter, JetBrains Mono (loaded in `index.html`).

## 📬 Contact form
The form currently simulates a send (1.2s timeout).
Wire it to your backend / Formspree / Resend in `src/components/Contact.jsx`.
