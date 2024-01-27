import { keys } from "./keys.js";
import { fibo } from "./fibo.js";
import { initRedis } from "../common/redis.mjs"
import { createClient } from "redis"

const { client } = await initRedis(keys, createClient)
const sub = client.duplicate();

sub.on("message", (_, message) => {
  client.hset("values", message, fibo(parseInt(message)));
});

sub.subscribe("insert");

process.on("SIGTERM", async () => {
  await client.disconnect();
  console.log("<<<<<<<< DISCONNECTING FROM REDIS >>>>>>>>");
});
