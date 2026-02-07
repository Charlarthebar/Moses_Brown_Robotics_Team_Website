# MB Robotics v2

A full-stack rebuild of the Moses Brown Robotics Team 1784 website using React, Express, and PostgreSQL.

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
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection string, JWT secret, and email credentials.

### 2. Create the database

```bash
createdb mb_robotics
```

### 3. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 4. Run database migrations

```bash
cd server && node migrate.js
```

This creates all tables and seeds a default admin user (`admin` / `admin123`).

### 5. Start development servers

```bash
# Terminal 1 — Express API server
cd server && node index.js

# Terminal 2 — Vite dev server
cd client && npm run dev
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
cd client && npm run build
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
