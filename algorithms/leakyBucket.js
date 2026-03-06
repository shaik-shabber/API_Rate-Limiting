const client = require("../config/redisClient");

async function leakyBucket(ip, capacity, leakRate) {

    const key = `leaky:${ip}`;

    const data = await client.hGetAll(key);

    const now = Date.now();

    let water = data.water ? parseInt(data.water) : 0;
    let lastLeak = data.lastLeak ? parseInt(data.lastLeak) : now;

    const elapsed = (now - lastLeak) / 1000;

    const leaked = Math.floor(elapsed * leakRate);

    water = Math.max(0, water - leaked);

    if (water >= capacity) {
        return { allowed: false };
    }

    water += 1;

    await client.hSet(key, {
        water,
        lastLeak: now
    });

    await client.expire(key, 3600);

    return { allowed: true };
}

module.exports = leakyBucket;