# Moses Brown Robotics Website

The official website for the **Moses Brown School VEX Robotics Team (Team 1784)**. Built to showcase the team, the VEX Robotics competition, and the Moses Brown Y-Lab makerspace.

## About

Moses Brown School competes in **VEX Robotics** with three teams: 1784X (seniors), 1784Y (juniors), and 1784Z (9th graders). This website provides information about the current game season (High Stakes 2024-2025), team photos, and the Y-Lab facility where the team builds and tests their robots.

### Pages

- **Home** — Hero landing, team mission, feature cards, and contact form
- **The Game** — VEX Robotics High Stakes game rules, robot photos, and official game video
- **Meet the Team** — Photo gallery of team events and tournaments
- **The Y-Lab** — Showcase of the 5,000 sq ft makerspace with image carousel

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Bootstrap 5, Google Fonts (Poppins, Work Sans), Font Awesome
- **Email:** Nodemailer (Gmail)
- **Security:** Helmet (HTTP headers), CORS, express-rate-limit
- **Deployment:** Heroku-ready (Procfile included)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) for the contact form

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Charlarthebar/Robotics-Website.git
   cd Robotics-Website/mb-robotics-backend\ copy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `mb-robotics-backend copy/` directory:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   EMAIL_TO=your-email@gmail.com
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
mb-robotics-backend copy/
├── server.js            # Express server with email API and security middleware
├── package.json         # Dependencies and scripts
├── Procfile             # Heroku deployment config
├── .env                 # Environment variables (not tracked in git)
├── .gitignore
└── public/
    ├── main.html        # Home page
    ├── game.html        # VEX Robotics game page
    ├── meet-the-team.html  # Team photo gallery
    ├── ylab.html        # Y-Lab makerspace page
    ├── 404.html         # Custom 404 error page
    ├── styles.css       # All styles (responsive, 4 breakpoints)
    ├── script.js        # AJAX form, animations, toast notifications
    └── images/          # Team photos, robot images, facility photos
```

## Features

- Responsive design across desktop, tablet, and mobile (4 breakpoints)
- AJAX contact form with loading state and toast notifications
- Scroll-triggered fade-in animations (IntersectionObserver)
- Rate-limited email endpoint (5 requests per 15 min)
- Server-side form validation
- Security headers via Helmet
- Custom 404 page
- Back-to-top button
- Bootstrap 5 collapsible mobile navigation
