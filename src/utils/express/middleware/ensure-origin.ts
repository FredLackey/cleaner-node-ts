/**
 * Express middleware to validate the 'Origin' header.
 * Ensures the header is present and represents a valid HTTP/HTTPS URL.
 * Sends a 400 Bad Request response if the origin is missing or invalid.
 * Otherwise, it calls the next middleware.
 * @param {Express.Request} req The Express request object.
 * @param {Express.Response} res The Express response object.
 * @param {Express.NextFunction} next The next middleware function.
 */
const ensureOrigin = (req, res, next) => {
  const value = req.header('Origin');
  if (!value) {
    return res.status(400).json({ message: 'Missing origin.' });
  }
  if (!value.toLowerCase().startsWith('http://') && !value.toLowerCase().startsWith('https://')) {
    return res.status(400).json({ message: 'Invalid origin.' });
  }
  const host = value.split('://')[1];
  if (!host) {
    return res.status(400).json({ message: 'Invalid host.' });
  }
  return next();
};

module.exports = ensureOrigin;
