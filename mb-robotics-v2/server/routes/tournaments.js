const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// ---------------------------------------------------------------------------
// GET /api/tournaments  --  List all tournaments (public)
// ---------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tournaments ORDER BY date DESC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /api/tournaments error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// POST /api/tournaments  --  Create a tournament (admin only)
// ---------------------------------------------------------------------------
router.post('/', auth, async (req, res) => {
  try {
    const { name, date, location, placement, awards, notes } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Tournament name is required.' });
    }

    const result = await pool.query(
      `INSERT INTO tournaments (name, date, location, placement, awards, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name.trim(),
        date || null,
        location || null,
        placement || null,
        awards || null,
        notes || null
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/tournaments error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/tournaments/:id  --  Update a tournament (admin only)
// ---------------------------------------------------------------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, location, placement, awards, notes } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Tournament name is required.' });
    }

    const result = await pool.query(
      `UPDATE tournaments
       SET name = $1, date = $2, location = $3,
           placement = $4, awards = $5, notes = $6
       WHERE id = $7
       RETURNING *`,
      [
        name.trim(),
        date || null,
        location || null,
        placement || null,
        awards || null,
        notes || null,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/tournaments/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/tournaments/:id  --  Delete a tournament (admin only)
// ---------------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tournaments WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found.' });
    }

    return res.json({ message: 'Tournament deleted.', tournament: result.rows[0] });
  } catch (err) {
    console.error('DELETE /api/tournaments/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
