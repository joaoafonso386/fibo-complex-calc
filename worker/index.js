import { keys } from "./keys.js";
import { fibo } from "./fibo.js";
import { initRedis } from "../common/redis.mjs"
import { createClient } from "redis"

const { redis, redisPuSub } = await initRedis(keys, createClient)

redisPuSub.on("message", (_, message) => {
  redis.hset("values", message, fibo(parseInt(message)));
});

redisPuSub.subscribe("insert");

process.on("SIGTERM", async () => {
  await redis.disconnect();
  console.log("<<<<<<<< DISCONNECTING FROM REDIS >>>>>>>>");
});
