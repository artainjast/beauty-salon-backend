const redis = require('ioredis')
// Redis client setup
const redisHost = process.env.NODE_ENV === 'production' ? process.env.REDIS_HOST_NAME: process.env.REDIS_HOST_NAME_DEMO;
const redisPort =  process.env.NODE_ENV === 'production' ? process.env.REDIS_PORT: process.env.REDIS_PORT_DEMO;
const redisPassword = process.env.REDIS_PASSWORD ;

const redisClient = new redis({
    host: redisHost,
    port: redisPort,
    password: redisPassword,
});

redisClient.on("error", (err) => {
  console.log("Redis Error " + err);
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

module.exports = redisClient;