const fixedWindow = require("../algorithms/FixedWindow");
const slidingWindow = require("../algorithms/SlidingWindowLog");
const tokenBucket = require("../algorithms/tokenBucket");
const leakyBucket = require("../algorithms/leakyBucket");

const config = require("../config/limiterConfig");

async function rateLimiter(req, res, next) {

    const ip = req.ip;

    const algo = req.query.algo || "token";

    let result;

    switch (algo) {

        case "fixed":
            result = await fixedWindow(
                ip,
                config.LIMIT,
                config.WINDOW_SIZE
            );
            break;

        case "sliding":
            result = await slidingWindow(
                ip,
                config.LIMIT,
                config.WINDOW_SIZE
            );
            break;

        case "leaky":
            result = await leakyBucket(
                ip,
                config.TOKEN_BUCKET_SIZE,
                config.LEAK_RATE
            );
            break;

        default:
            result = await tokenBucket(
                ip,
                config.TOKEN_BUCKET_SIZE,
                config.REFILL_RATE
            );
    }

    if (!result.allowed) {

        return res.status(429).json({
            message: "Too Many Requests"
        });

    }

    next();
}

module.exports = rateLimiter;