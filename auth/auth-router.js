const router = require('express').Router();
const bcrypt = require('bcryptjs'); // hashing PW 

const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js'); 

const Users = require('../auth/authHelper.js');

//
// username = "username", "password"; both required.

router.post('/register', (req, res) => {
  let user = req.body;

  console.log(user);

  const hash = bcrypt.hashSync(user.password, 10);

  console.log(hash);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log('error', error);
      res.status(500).json({
        message: 'Failed to register a new user. '
      });
    });
});


// 
router.post('/login', (req, res) => {
  let { username, password } = req.body;  //postman raw JSON 

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log(user);

        const token = generateToken(user);

        res.status(200).json({ message: `Welcome 👋🏻  ${user.username}! `, token: token, 
      });
      } else {
        res.status(401).json({ message: ' You shall not pass, bad token! 🙅‍♀️'})
      }
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({
        message: ` You shall not enter, no token 😭` 
      });
    });
});


function generateToken(user) {
  const payload= {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  }

  const token = jwt.sign(payload, secret.jwtSecret, options); 
}

module.exports = router;
