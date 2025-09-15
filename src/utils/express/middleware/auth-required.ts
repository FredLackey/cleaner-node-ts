const c = require('../../../constants');
const { UNAUTHORIZED } = c.HTTP.STATUS.PHRASES;

/**
 * Express middleware to require authentication.
 * Checks for a valid, non-expired session.
 * If the session is missing, invalid, or expired, it sends a 401 Unauthorized response.
 * Otherwise, it calls the next middleware.
 * @param {Express.Request} req The Express request object.
 * @param {Express.Response} res The Express response object.
 * @param {Express.NextFunction} next The next middleware function.
 */
const authRequired = (req, res, next) => {
  console.log('authRequired', req.session);
  if (!req.session) {
    return res.status(UNAUTHORIZED.code).json({ message: 'Login required.' });
  }
  if (req.session.valid !== true) {
    return res.status(UNAUTHORIZED.code).json({ message: 'Invalid session.' });
  }
  if (req.session.expired !== false) {
    return res.status(UNAUTHORIZED.code).json({ message: 'Expired session.' });
  }
  
  return next();
};

module.exports = authRequired;
