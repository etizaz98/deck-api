const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST ? process.env.REDIS_HOST : "",
  port: process.env.REDIS_PORT ? process.env.REDIS_PORT : "",
  password: process.env.REDIS_PASSWORD,
  tls: !!process.env.REDIS_PASSWORD,
});

export default redisClient;
