const c = require('../../../constants');
const { METHOD_NOT_ALLOWED } = c.HTTP.STATUS.PHRASES;

/**
 * Express middleware to prohibit access for authenticated users.
 * If a valid, non-expired session exists, it sends a 405 Method Not Allowed response.
 * Otherwise, it calls the next middleware.
 * @param {Express.Request} req The Express request object.
 * @param {Express.Response} res The Express response object.
 * @param {Express.NextFunction} next The next middleware function.
 */
const authProhibited = (req, res, next) => {
  if (req.session) {
    if (req.session.valid === true || req.session.expired === false) {
      return res.status(METHOD_NOT_ALLOWED.code).json({ message: 'Not accessible while logged in.' });
    }
  }
  return next();
};

module.exports = authProhibited;
