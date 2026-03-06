const client = require("../config/redisClient");

async function tokenBucket(ip, capacity, refillRate) {

    const key = `token:${ip}`;

    const data = await client.hGetAll(key);

    const now = Date.now();

    let tokens = data.tokens ? parseFloat(data.tokens) : capacity;
    let lastRefill = data.lastRefill ? parseInt(data.lastRefill) : now;

    const elapsed = (now - lastRefill) / 1000;

    const refill = Math.floor(elapsed * refillRate);

    if (refill > 0) {
        tokens = Math.min(capacity, tokens + refill);
        lastRefill = now;
    }

    if (tokens <= 0) {
        return { allowed: false };
    }

    tokens -= 1;

    await client.hSet(key, {
        tokens,
        lastRefill
    });

    await client.expire(key, 3600);

    return { allowed: true };
}

module.exports = tokenBucket;