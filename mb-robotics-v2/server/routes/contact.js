const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require('../db');
const auth = require('../middleware/auth');

// ---------------------------------------------------------------------------
// POST /api/contact  --  Submit a contact form (public)
// ---------------------------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Save to database
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), email.trim(), message.trim()]
    );

    // Send email notification (non-blocking -- we don't fail the request if
    // the email transport is not configured or the send fails)
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT, 10) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          subject: `New Contact Form Submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
      }
    } catch (emailErr) {
      console.error('Failed to send contact notification email:', emailErr.message);
    }

    return res.status(201).json({
      message: 'Contact form submitted successfully.',
      submission: result.rows[0]
    });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/contact  --  List all contact submissions (admin only)
// ---------------------------------------------------------------------------
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /api/contact error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
