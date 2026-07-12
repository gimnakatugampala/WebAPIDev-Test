// middleware/auth.js
const authenticate = (req, res, next) => {
    const apiKey = req.header('X-API-Key');
    
    // Replace 'key_v01' with your actual secure validation logic
    if (apiKey === 'key_v01') {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized: Invalid or missing API Key" });
    }
};

module.exports = authenticate;