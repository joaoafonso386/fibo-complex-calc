export const initRedis = async (keys, createClient) => {
  let redis
  let redisPuSub
  try {
    redis = await createClient({
      legacyMode: true,
      socket: {
        host: keys.redisHost,
        reconnectStrategy: () => 1000,
      },
    }).connect();
    redisPuSub = redis.duplicate();
    console.log("Connected to Redis!");
  } catch (e) {
    console.error("<<<<REDIS ERROR>>>>", e);
  }

  return { redis, redisPuSub }
  
};


