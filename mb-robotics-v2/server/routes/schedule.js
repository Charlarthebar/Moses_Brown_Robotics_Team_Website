const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// ---------------------------------------------------------------------------
// GET /api/schedule  --  List all schedule events (public)
// ---------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM schedule_events ORDER BY event_date ASC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /api/schedule error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// POST /api/schedule  --  Create a schedule event (admin only)
// ---------------------------------------------------------------------------
router.post('/', auth, async (req, res) => {
  try {
    const { title, event_date, event_time, location, description, event_type } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const result = await pool.query(
      `INSERT INTO schedule_events (title, event_date, event_time, location, description, event_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title.trim(),
        event_date || null,
        event_time || null,
        location || null,
        description || null,
        event_type || 'practice'
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/schedule error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/schedule/:id  --  Update a schedule event (admin only)
// ---------------------------------------------------------------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, event_date, event_time, location, description, event_type } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const result = await pool.query(
      `UPDATE schedule_events
       SET title = $1, event_date = $2, event_time = $3, location = $4,
           description = $5, event_type = $6
       WHERE id = $7
       RETURNING *`,
      [
        title.trim(),
        event_date || null,
        event_time || null,
        location || null,
        description || null,
        event_type || 'practice',
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Schedule event not found.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/schedule/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/schedule/:id  --  Delete a schedule event (admin only)
// ---------------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM schedule_events WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Schedule event not found.' });
    }

    return res.json({ message: 'Schedule event deleted.', event: result.rows[0] });
  } catch (err) {
    console.error('DELETE /api/schedule/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
