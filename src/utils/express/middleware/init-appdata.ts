/**
 * Express middleware to initialize the `req.appData` object if it doesn't exist.
 * Ensures `req.appData` is always available for subsequent middleware or route handlers.
 * @param {Express.Request} req The Express request object.
 * @param {Express.Response} res The Express response object.
 * @param {Express.NextFunction} next The next middleware function.
 */
const initAppData = (req, res, next) => {
  req.appData = req.appData || {};
  return next();
};

module.exports = initAppData;
