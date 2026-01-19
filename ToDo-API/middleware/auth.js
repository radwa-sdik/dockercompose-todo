const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // Retrieve token from cookies
    const token = req.cookies.token;  

    if (!token) {
        return res.json({ message: 'No Token Provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.json({ message: 'Invalid Token' });

        req.user = user; // decoded payload
        next();
    });
}

module.exports = authMiddleware;
