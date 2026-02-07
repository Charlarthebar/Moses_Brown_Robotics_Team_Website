require('dotenv').config();

const pool = require('./db');
const bcrypt = require('bcryptjs');

async function migrate() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // -----------------------------------------------------------------------
    // team_members
    // -----------------------------------------------------------------------
    await client.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(255) NOT NULL,
        role          VARCHAR(255),
        grade         VARCHAR(50),
        team          VARCHAR(50),
        bio           TEXT,
        photo_url     VARCHAR(500),
        display_order INTEGER DEFAULT 0,
        created_at    TIMESTAMP DEFAULT NOW()
      );
    `);

    // -----------------------------------------------------------------------
    // tournaments
    // -----------------------------------------------------------------------
    await client.query(`
      CREATE TABLE IF NOT EXISTS tournaments (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        date       DATE,
        location   VARCHAR(255),
        placement  VARCHAR(100),
        awards     TEXT,
        notes      TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // -----------------------------------------------------------------------
    // blog_posts
    // -----------------------------------------------------------------------
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id         SERIAL PRIMARY KEY,
        title      VARCHAR(255) NOT NULL,
        content    TEXT,
        author     VARCHAR(255),
        published  BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // -----------------------------------------------------------------------
    // contact_submissions
    // -----------------------------------------------------------------------
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        email      VARCHAR(255) NOT NULL,
        message    TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // -----------------------------------------------------------------------
    // schedule_events
    // -----------------------------------------------------------------------
    await client.query(`
      CREATE TABLE IF NOT EXISTS schedule_events (
        id          SERIAL PRIMARY KEY,
        title       VARCHAR(255) NOT NULL,
        event_date  DATE,
        event_time  VARCHAR(50),
        location    VARCHAR(255),
        description TEXT,
        event_type  VARCHAR(50) DEFAULT 'practice',
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);

    // -----------------------------------------------------------------------
    // admin_users
    // -----------------------------------------------------------------------
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id            SERIAL PRIMARY KEY,
        username      VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at    TIMESTAMP DEFAULT NOW()
      );
    `);

    // -----------------------------------------------------------------------
    // Seed default admin user (only if none exists)
    // -----------------------------------------------------------------------
    const { rows } = await client.query(
      'SELECT id FROM admin_users WHERE username = $1',
      ['admin']
    );

    if (rows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
        ['admin', hash]
      );
      console.log('Default admin user created (username: admin)');
    } else {
      console.log('Admin user already exists, skipping seed.');
    }

    await client.query('COMMIT');
    console.log('Migration completed successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
