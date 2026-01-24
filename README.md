# NextBlog

A modern, premium blogging platform built with Next.js 15 and Tailwind CSS. Features a stunning dark-themed hero section, responsive design, and seamless authentication.

🔗 **Live Demo:** [the-nextblog.vercel.app](https://the-nextblog.vercel.app)

---

## ✨ Features

| Feature            | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **Modern UI**      | Premium design with glassmorphism, gradients, and micro-animations |
| **Authentication** | Secure login/signup with Kinde Auth                                |
| **Responsive**     | Optimized for mobile, tablet, and desktop                          |
| **Performance**    | Built with Next.js 15 Turbopack for fast loading                   |
| **Components**     | Reusable shadcn/ui components                                      |

---

## 📄 Pages

- **Home** — Hero section with floating cards, stats, and featured articles
- **Blogs** — Article listing with search, filters, and category navigation
- **Profile** — User dashboard with stats, activity, and settings
- **Post** — Individual article view with comments, likes, and sharing

---

## 🛠 Tech Stack

| Technology                               | Purpose                         |
| ---------------------------------------- | ------------------------------- |
| [Next.js 15](https://nextjs.org/)        | React framework with App Router |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling           |
| [shadcn/ui](https://ui.shadcn.com/)      | UI component library            |
| [Kinde Auth](https://kinde.com/)         | Authentication provider         |
| [Lucide React](https://lucide.dev/)      | Icon library                    |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/NextBlog.git

# Navigate to project
cd NextBlog

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
KINDE_CLIENT_ID=your_client_id
KINDE_CLIENT_SECRET=your_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000
```

> Get your credentials from the [Kinde Dashboard](https://app.kinde.com/)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js          # Home page
│   ├── blogs/           # Blog listing
│   ├── profile/         # User profile
│   ├── posts/[id]/      # Individual post
│   └── api/auth/        # Kinde auth routes
├── components/
│   ├── Navbar.jsx       # Navigation bar
│   ├── Footer.jsx       # Footer component
│   └── ui/              # shadcn/ui components
└── lib/
    └── utils.js         # Utility functions
```

---

## 📝 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---
