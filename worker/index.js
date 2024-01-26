import { keys } from "./keys.js";
import { createClient } from "redis";
import { fibo } from "./fibo.js";

let client;

try {
  client = await createClient({
    legacyMode: true,
    socket: {
      host: keys.redisHost,
      reconnectStrategy: () => 1000,
    },
  }).connect();
  console.log("Connected to Redis!");

  const sub = client.duplicate();

  sub.on("message", (_, message) => {
    client.hset("values", message, fibo(parseInt(message)));
  });

  sub.subscribe("insert");
} catch (e) {
  console.error("Redis Client Error", e);
}

process.on("SIGTERM", async () => {
  await client.disconnect();
  console.log("<<<<<<<< DISCONNECTING FROM REDIS >>>>>>>>");
});
