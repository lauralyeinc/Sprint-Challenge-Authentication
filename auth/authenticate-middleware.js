const jwt = require('jsonwebtoken');

const secret = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: ' You shall not pass, bad or expired Token 🔒'})
      } else {
        req.decodedJwt = decodedToken;
        next();   
      } 
    })
  } else {
    res.status(401).json({ message: ' You shall not enter, no token or bad token. 🔒'}); 
  }
}


/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };
