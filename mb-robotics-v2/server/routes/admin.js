const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const auth = require('../middleware/auth');

// ---------------------------------------------------------------------------
// POST /api/admin/login  --  Authenticate admin user
// ---------------------------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const result = await pool.query(
      'SELECT * FROM admin_users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (err) {
    console.error('POST /api/admin/login error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/admin/me  --  Get current admin user info (auth required)
// ---------------------------------------------------------------------------
router.get('/me', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, created_at FROM admin_users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /api/admin/me error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
