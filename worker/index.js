import { keys } from "./keys.js";
import { fibo } from "./fibo.js";
import { initRedis } from "../common/redis.mjs"
import { createClient } from "redis"

const { redis } = await initRedis(keys, createClient)

redis.on("message", (_, message) => {
  redis.hset("values", message, fibo(parseInt(message)));
});

redis.subscribe("insert");

process.on("SIGTERM", async () => {
  await redis.disconnect();
  console.log("<<<<<<<< DISCONNECTING FROM REDIS >>>>>>>>");
});
