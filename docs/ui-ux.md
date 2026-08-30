# UI/UX Design System — RailOptix-AI

---

## 1. Design System Principles

The visual language follows the **Cinematic Dark Glassmorphism** design reference:

- **Theme**: Deep Navy / Charcoal Black background (`#090E14`).
- **Surface**: Glassmorphism cards with translucent white background (`bg-white/5`), border glow (`border-white/10` to `border-white/20`), and backdrop blur (`backdrop-blur-xl`).
- **Typography**: Clean, high-readability sans-serif (Inter / System Sans) with bold numerical telemetry displays (`font-mono`).
- **Color Accents**:
  - **Cyan / Blue**: Primary actions, hero headers, branding.
  - **Emerald Green**: On-Time status, normal signal aspect, optimal AI recommendations.
  - **Yellow / Amber**: Minor delays (1–15m), caution signals, warnings.
  - **Red**: Severe delays (>15m), stop signals, critical conflicts.

---

## 2. Layout Guidelines

- **Top Navigation Bar (`Navbar.tsx`)**: Sticky header containing logo (`railoptix-ai`), primary navigation links (**Dashboard**, **Network**, **Trains**, **Analytics**, **Alerts**, **AI Assistant**), search button, notifications, and user avatar.
- **Hero Section**: High-resolution dark locomotive photographic background with linear gradient overlays (`from-[#090E14] via-[#090E14]/75 to-transparent`).
