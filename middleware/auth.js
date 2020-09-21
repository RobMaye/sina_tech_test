const config = require('config');
const jwt = require('jsonwebtoken');

// Get token and authenticate in middleware
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) return res.status(401).json({ msg: 'No token, authorisation denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Bad token' })
    }
}

module.exports = auth;