const client = require("../config/redisClient");

async function fixedWindow(ip, limit, windowSize) {

    const key = `fixed:${ip}`;

    const current = await client.get(key);

    if (!current) {

        await client.set(key, 1, {
            EX: windowSize
        });

        return { allowed: true };
    }

    if (parseInt(current) >= limit) {
        return { allowed: false };
    }

    await client.incr(key);

    return { allowed: true };
}

module.exports = fixedWindow;