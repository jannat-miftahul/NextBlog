# NextBlog

> A modern, premium blogging platform built with Next.js 15, featuring a stunning UI, authentication, and seamless user experience.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Kinde Auth](https://img.shields.io/badge/Auth-Kinde-6C47FF?style=flat-square)](https://kinde.com/)

**Live Demo:** [the-nextblog.vercel.app](https://the-nextblog.vercel.app)

---

## Features

- **Premium UI** — Glassmorphism effects, gradient backgrounds, and smooth micro-animations
- **Secure Auth** — Easy authentication with Kinde (login, signup, logout)
- **Fully Responsive** — Optimized for mobile, tablet, and desktop devices
- **Fast Performance** — Built with Next.js 15 and optimized for speed
- **Component Library** — Reusable shadcn/ui components
- **Dark Theme** — Beautiful dark mode with blue gradient accents
- **Active Route Indicators** — Visual feedback for current page navigation

---

## Pages

| Page             | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Home**         | Hero section with floating cards, stats, and featured articles |
| **Articles**     | Article listing with search, filters, and category navigation  |
| **Profile**      | User dashboard with stats, activity, and personalized content  |
| **Post Details** | Individual article view with metadata and reading experience   |

---

## Tech Stack

| Technology                               | Purpose                          |
| ---------------------------------------- | -------------------------------- |
| [Next.js 15](https://nextjs.org/)        | React framework with App Router  |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework      |
| [shadcn/ui](https://ui.shadcn.com/)      | Beautifully designed components  |
| [Kinde Auth](https://kinde.com/)         | Authentication & user management |
| [Lucide React](https://lucide.dev/)      | Modern icon library              |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/NextBlog.git

# Navigate to project directory
cd NextBlog

# Install dependencies
npm install

# Set up environment variables (see below)
# Create .env.local and add your Kinde credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory and add your Kinde Auth credentials:

```env
KINDE_CLIENT_ID=your_client_id
KINDE_CLIENT_SECRET=your_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000
```

> 💡 Get your credentials from the [Kinde Dashboard](https://app.kinde.com/)

---

## Project Structure

```
NextBlog/
├── src/
│   ├── app/              # Pages & routing
│   ├── components/       # React components
│   └── lib/              # Utilities
├── public/               # Static assets
└── .env.local            # Environment variables
```

---

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server (port 3000) |
| `npm run build` | Build optimized production bundle    |
| `npm run start` | Start production server              |
| `npm run lint`  | Run ESLint for code quality          |

---

**Built with ❤️ using Next.js**
