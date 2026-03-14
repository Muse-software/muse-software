# Muse Software

Enterprise AI agency website — delivering AI transformation, digital products, gamification, and generative AI solutions at startup speed.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP, Motion (Framer Motion)
- **Fonts**: Space Grotesk, Inter, Inter Tight
- **Components**: ReactBits (RotatingText, ShinyText, StaggeredMenu)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts and metadata
  page.tsx            # Home page
  globals.css         # Global styles and Tailwind config
components/
  sections/
    Hero.tsx          # Hero section with statue GIF and rotating tagline
  StaggeredMenu.tsx   # Animated slide-out navigation with burger icon
  RotatingText.tsx    # Character-level animated text rotation
  ShinyText.tsx       # Shiny text effect for logo
  TextType.tsx        # Typewriter text animation
  FuzzyText.tsx       # Fuzzy/glitch text effect
public/
  hero-bg-new.gif     # Animated statue hero visual
  fonts/              # Custom fonts
```

## Branches

- `main` — production (auto-deploys)
- `archive/main-coming-soon` — previous "Coming Soon" landing page
- `feature/hero-redesign` — hero redesign work branch

## Deployment

Deployed via Vercel. Pushes to `main` trigger automatic deployments.
