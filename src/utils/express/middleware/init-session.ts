const jwt = require('../../jwt');
const removePrefix = require('../../remove-prefix');

const { JWT_SECRET } = process.env;

/**
 * Express middleware to initialize the session object (`req.session`) based on a JWT found in the Authorization header.
 * It decodes the JWT, verifies its signature (using JWT_SECRET), and checks for expiration.
 * Sets `req.session.valid` and `req.session.expired` accordingly.
 * @param {Express.Request} req The Express request object.
 * @param {Express.Response} res The Express response object.
 * @param {Express.NextFunction} next The next middleware function.
 */
const initSession = (req, res, next) => {

  const key    = Object.keys(req.headers).find(key => key.toLowerCase() === 'authorization');
  console.log('initSession', key);

  const header = key ? req.headers[key] : null;
  
  const token  = header ? removePrefix(header, 'Bearer').trim() : null;

  if (token) {
    
    req.session = jwt.decode(token);
    req.session = jwt.fromClaims(req.session);
    req.session = req.session || {};
    
    if (jwt.verify(token, JWT_SECRET, true)) {
      req.session.valid = true;
    } else {
      req.session.valid = false;
    }

    if (req.session.expiry) {
      req.session.expired = req.session.expiry < Date.now();
    }
  
  }

  return next();

};

module.exports = initSession;
