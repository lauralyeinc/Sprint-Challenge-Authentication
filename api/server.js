const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

// testing server 
// 
server.get('/', (req, res) => {
    res.send(`<h1> Spring Challenge Authentication! 👸`)
});


// testing token 
// 
server.get('/token', (req, res) => {
    const payload= {
        subject: 'testertoken',
        username: 'tessthetester',
        favoriteColor:'purple'
    };

    const secret = "don't test tess";

    const options = {
        expiresIn: '8h'
    };

    const token = jwt.sign(payload, secret, options);

    res.json(token);
});

module.exports = server;
