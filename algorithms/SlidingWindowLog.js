const client = require("../config/redisClient");

async function slidingWindowLog(ip, limit, windowSize) {

    const key = `sliding:${ip}`;

    const now = Date.now();
    const windowStart = now - windowSize * 1000;

    await client.zRemRangeByScore(key, 0, windowStart);

    const count = await client.zCard(key);

    if (count >= limit) {
        return { allowed: false };
    }

    await client.zAdd(key, {
        score: now,
        value: now.toString()
    });

    await client.expire(key, windowSize);

    return { allowed: true };
}

module.exports = slidingWindowLog;