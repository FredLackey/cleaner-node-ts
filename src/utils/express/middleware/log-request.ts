const { NODE_ENV } = process.env;

/**
 * Express middleware to log request details in development environments.
 * Logs the request method, URL, Origin header, Referrer header, and request body.
 * Only logs if NODE_ENV is set to 'development'.
 * @param {Express.Request} req The Express request object.
 * @param {Express.Response} res The Express response object.
 * @param {Express.NextFunction} next The next middleware function.
 */
const logRequest = (req, res, next) => {
  
  if (NODE_ENV === 'development') {
    console.log(JSON.stringify({
      url: `${req.method} ${req.url}`,
      origin: req.header('Origin'),
      referrer: req.header('Referrer'),
      body: req.body
    }, null, 2));
  }

  return next();
};

module.exports = logRequest;
