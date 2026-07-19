// middleware/auth.js
const jwt = require('jsonwebtoken');

// Verifies a JWT sent as: Authorization: Bearer <token>
// Get a token from POST /v1/api/auth/token (see router/auth.js).
const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or malformed Authorization header' });
    }

    const token = authHeader.slice('Bearer '.length).trim();

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = decoded; // available to downstream handlers if needed
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token expired' });
        }
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticate;