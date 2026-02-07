const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// ---------------------------------------------------------------------------
// GET /api/blog  --  List published blog posts (public)
// ---------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /api/blog error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/blog/:id  --  Get a single blog post (public)
// ---------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /api/blog/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// POST /api/blog  --  Create a blog post (admin only)
// ---------------------------------------------------------------------------
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, author, published } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const result = await pool.query(
      `INSERT INTO blog_posts (title, content, author, published)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        title.trim(),
        content || null,
        author || null,
        published === true
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/blog error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// PUT /api/blog/:id  --  Update a blog post (admin only)
// ---------------------------------------------------------------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, published } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const result = await pool.query(
      `UPDATE blog_posts
       SET title = $1, content = $2, author = $3,
           published = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [
        title.trim(),
        content || null,
        author || null,
        published === true,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/blog/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/blog/:id  --  Delete a blog post (admin only)
// ---------------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM blog_posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    return res.json({ message: 'Blog post deleted.', post: result.rows[0] });
  } catch (err) {
    console.error('DELETE /api/blog/:id error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
