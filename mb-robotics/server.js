require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers (relaxed for inline styles/scripts and external CDNs)
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors());

// Parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rate limit the email endpoint (5 requests per 15 minutes per IP)
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many messages sent. Please try again later.' }
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file at "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Create the mail transporter once (reuse across requests)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Handle contact form submission
app.post('/send-email', emailLimiter, (req, res) => {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (name.length > 100) {
        return res.status(400).json({ error: 'Name is too long.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (message.length > 5000) {
        return res.status(400).json({ error: 'Message is too long (max 5000 characters).' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_TO,
        subject: `MB Robotics Contact: ${name}`,
        text: `From: ${name} (${email})\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email send error:', error.message);
            return res.status(500).json({ error: 'Failed to send message. Please try again.' });
        }
        res.json({ success: 'Message sent successfully!' });
    });
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server (single instance)
app.listen(PORT, () => {
    console.log(`MB Robotics server running on port ${PORT}`);
});
