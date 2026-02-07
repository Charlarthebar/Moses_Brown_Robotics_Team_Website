const jwt = require('jsonwebtoken');

/**
 * Middleware that verifies a JWT Bearer token from the Authorization header.
 * On success it attaches the decoded payload to req.user and calls next().
 * On failure it responds with 401 Unauthorized.
 */
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = auth;
