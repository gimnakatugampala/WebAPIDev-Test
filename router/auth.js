// router/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// ---------------------------------------------------------
// 6. Auth
// ---------------------------------------------------------

// POST /v1/api/auth/token
// Body: { "apiKey": "key_v01" }
//
// Exchanges the existing shared API key for a short-lived JWT.
// This keeps your current credential (the "device key") as the thing
// that proves who's calling, but the API itself now trusts a signed,
// expiring token rather than a static header on every request.
router.post('/token', (req, res) => {
    try {
        const { apiKey } = req.body || {};

        if (!apiKey || apiKey !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
        }

        const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

        const token = jwt.sign(
            { sub: 'device', scope: 'pings:write' },
            process.env.JWT_SECRET,
            { expiresIn }
        );

        res.status(200).json({ token, token_type: 'Bearer', expires_in: expiresIn });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;