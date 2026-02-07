const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// ---------------------------------------------------------------------------
// GET /api/team  --  List all team members (public)
// ---------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members ORDER BY display_order ASC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /api/team error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// POST /api/team  --  Create a team member (admin only)
// ---------------------------------------------------------------------------
router.post('/', auth, async (req, res) => {
  try {
    const { name, role, grade, team, bio, photo_url, display_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const result = await pool.query(
      `INSERT INTO team_members (name, role, grade, team, bio, photo_url, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        name.trim(),
        role || null,
        grade || null,
        team || null,
        bio || null,
        photo_url || null,
        display_order != null ? display_order : 0
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/team error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/team/:id  --  Update a team member (admin only)
// ---------------------------------------------------------------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, grade, team, bio, photo_url, display_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const result = await pool.query(
      `UPDATE team_members
       SET name = $1, role = $2, grade = $3, team = $4,
           bio = $5, photo_url = $6, display_order = $7
       WHERE id = $8
       RETURNING *`,
      [
        name.trim(),
        role || null,
        grade || null,
        team || null,
        bio || null,
        photo_url || null,
        display_order != null ? display_order : 0,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/team/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/team/:id  --  Delete a team member (admin only)
// ---------------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM team_members WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    return res.json({ message: 'Team member deleted.', member: result.rows[0] });
  } catch (err) {
    console.error('DELETE /api/team/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
