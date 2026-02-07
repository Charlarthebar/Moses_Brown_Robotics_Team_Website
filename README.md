# MB Robotics v2

A full-stack rebuild of the Moses Brown Robotics Team 1784 website using React, Express, and PostgreSQL.

> The original vanilla HTML/CSS/JS version is preserved in `mb-robotics/`.

## Tech Stack

**Frontend:** React 18, Vite, React Router v6, Framer Motion, React Helmet Async
**Backend:** Express.js, PostgreSQL, JWT authentication, Nodemailer
**Features:** Dark/light theme toggle, animated page transitions, image lightbox, PWA support, SEO meta tags, admin dashboard

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### 1. Set up environment variables

```bash
cd mb-robotics-v2
cp .env.example server/.env
```

Edit `server/.env` with your PostgreSQL connection string, JWT secret, and email credentials.

### 2. Create the database

```bash
createdb mb_robotics
```

### 3. Install dependencies

```bash
cd mb-robotics-v2/server && npm install
cd mb-robotics-v2/client && npm install
```

### 4. Run database migrations

```bash
cd mb-robotics-v2/server && node migrate.js
```

This creates all tables and seeds a default admin user (`admin` / `admin123`).

### 5. Start development servers

Open **two separate terminals** from the repository root:

```bash
# Terminal 1 — Express API server (port 3000)
cd mb-robotics-v2/server && node index.js

# Terminal 2 — Vite dev server (port 5173)
cd mb-robotics-v2/client && npm run dev
```

The Vite dev server proxies `/api` requests to the Express server on port 3000.

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, mission, features, contact form |
| The Game | `/game` | VEX High Stakes game overview |
| Meet the Team | `/team` | Photo grid with lightbox |
| Team Profiles | `/team/profiles` | Individual member bios |
| Y-Lab | `/ylab` | Makerspace info and photos |
| Schedule | `/schedule` | Upcoming events calendar |
| Results | `/results` | Tournament history and awards |
| Blog | `/blog` | News and updates |
| Admin | `/admin` | Dashboard for managing content |

## Production Build

```bash
cd mb-robotics-v2/client && npm run build
```

Set `NODE_ENV=production` in `.env` and the Express server will serve the built React app from `client/dist/`.

## Project Structure

```
mb-robotics-v2/
├── client/                 # React frontend (Vite)
│   ├── public/             # Static assets, images, PWA files
│   └── src/
│       ├── components/     # Navbar, Footer, Lightbox, Toast, PageTransition
│       ├── context/        # ThemeContext (dark/light mode)
│       └── pages/          # All page components
├── server/                 # Express backend
│   ├── routes/             # API route handlers
│   ├── middleware/          # JWT auth middleware
│   ├── db.js               # PostgreSQL connection pool
│   ├── migrate.js          # Database migration script
│   └── index.js            # Server entry point
├── .env.example            # Environment variable template
└── README.md
```
