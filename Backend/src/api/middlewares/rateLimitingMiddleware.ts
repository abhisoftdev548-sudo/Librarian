import ratelimit from 'express-rate-limit';

const rateLimitingMiddleware = ratelimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { message: "Too many requests, please try again after a minute." }
});
export default rateLimitingMiddleware;