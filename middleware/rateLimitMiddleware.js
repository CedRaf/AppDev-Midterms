const rateLimit = require("express-rate-limit"); 

const rateLimitMiddleware = rateLimit({
    windowMs: 30 * 1000, 
    max: 5,
    message: "Too many requests, try again in 30 seconds",
    headers: true,
});

module.exports = rateLimitMiddleware; 
