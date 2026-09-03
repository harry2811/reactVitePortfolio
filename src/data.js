// Centralized portfolio data — edit here, not in components

export const navLinks = [
  { id: 'home',      label: 'Home',      num: '01' },
  { id: 'work',      label: 'Work',      num: '02' },
  { id: 'services',  label: 'Services',  num: '03' },
  { id: 'about',     label: 'About',     num: '04' },
  { id: 'contact',   label: 'Contact',   num: '05' },
]

// Hero rotating labels — anchored to the 3D crate's faces
export const crateLabels = [
  { face: 0, title: 'Custom Liquid sections', metric: '+38% AOV',  desc: 'Modular product blocks tuned for cross-sells.' },
  { face: 1, title: 'Headless Hydrogen build', metric: 'TTFB 120ms', desc: 'React + Hydrogen on Shopify’s edge CDN.' },
  { face: 2, title: 'Theme from scratch',     metric: '6 weeks',  desc: 'From Figma to production on a custom Dawn fork.' },
  { face: 3, title: 'Checkout CRO',           metric: '-22% abandon', desc: 'Single-step checkout, trust signals, Apple Pay.' },
]

// Manifesto — shown in About, not Hero (Hero stays tight)
export const manifesto = [
  'Make it fast.',
  'Make it measurable.',
  'Make it on-brand.',
  'Make it conversion-first.',
  'Make it last past the launch.',
  'Make it.',
]

export const services = [
  { title: 'Theme Development',  desc: 'Hand-built Shopify themes from scratch — clean Liquid, semantic markup, and CRO-aware UX.', icon: 'Code2' },
  { title: 'Custom Storefronts', desc: 'Pixel-perfect, brand-aligned storefronts tuned to your product, audience, and sales funnel.',     icon: 'Layout' },
  { title: 'Headless Shopify',   desc: 'Hydrogen + React on the edge — blazing fast, app-driven commerce that scales.',                  icon: 'Cpu' },
  { title: 'Speed Optimization', desc: 'Core Web Vitals tuning, asset lazy-loading, and Liquid loop refactors for sub-second loads.',  icon: 'Zap' },
  { title: 'App Integration',    desc: 'Custom apps, private apps, and webhook flows via Shopify Admin API and GraphQL.',               icon: 'Plug' },
  { title: 'Landing Pages',      desc: 'High-converting landing pages with tight typography, bold visuals, and A/B-ready sections.',   icon: 'Sparkles' },
]

const projectImage = (filename) => `${import.meta.env.BASE_URL}projects/${filename}`

export const projects = [
  {
    name: 'Yardsale',
    desc: 'Dawn customization with bespoke product cards, dynamic metafields, and a custom cart drawer.',
    tags: ['Dawn', 'Liquid', 'Metafields'],
    metric: '+38% AOV',
    featured: true,
    accent: 'cyan',
    image: projectImage('yardsale.jpg'),
  },
  {
    name: 'Barry Red Studio',
    desc: 'Editorial storefront for a creative studio — bold type, immersive imagery, custom sections.',
    tags: ['Editorial', 'Theme Dev'],
    metric: '2.4× LCP',
    accent: 'violet',
    image: projectImage('barryred.jpg'),
  },
  {
    name: 'KUVRD Core',
    desc: 'Product configurator with rich media, 3D-ready embeds, and dynamic variant storytelling.',
    tags: ['Liquid', 'Configurator'],
    metric: '+19% conversion',
    accent: 'cyan',
    image: projectImage('kuvrd.jpg'),
  },
  {
    name: 'GardPro GearHub',
    desc: 'Performance-focused build with custom filters, predictive search, and an upgraded PDP.',
    tags: ['Performance', 'PDP'],
    metric: '0.8s LCP',
    accent: 'violet',
    image: projectImage('yardsale.jpg'),
  },
  {
    name: 'Orata Crafted',
    desc: 'Boutique brand experience with hand-illustrated sections and a custom CMS-driven journal.',
    tags: ['Branding', 'CMS'],
    metric: '+52% sessions',
    accent: 'cyan',
    image: projectImage('kuvrd.jpg'),
  },
  {
    name: 'Living Essentials',
    desc: 'CRO-driven home and collection pages with refined merchandising and A/B-tested sections.',
    tags: ['CRO', 'A/B'],
    metric: '-22% bounce',
    accent: 'violet',
    image: projectImage('LIVING-SILICA.jpg'),
  },
]

export const techStack = [
  'Shopify Templates', 'Theme Customisation', 'Custom Theme Development',
  'Frontend', 'Shopify Backend APIs', 'Liquid', 'Hydrogen', 'React',
  'Shopify CLI', 'GraphQL', 'Admin API', 'JavaScript', 'Tailwind', 'Git & GitHub',
]

export const stats = [
  { label: 'Years experience',  value: '3+'   },
  { label: 'Stores launched',   value: '40+'  },
  { label: 'Avg. speed boost',  value: '2.4x' },
  { label: 'Client satisfaction', value: '100%' },
]

export const socials = [
  { name: 'GitHub',   url: 'https://github.com',   icon: 'Github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { name: 'Email',    url: 'mailto:hello@example.com', icon: 'Mail' },
  { name: 'Resume',   url: '#',                   icon: 'FileText' },
]
