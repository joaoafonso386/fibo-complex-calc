export const initRedis = async (keys, createClient) => {
  let redis
  try {
    redis = await createClient({  url: `redis://${keys.redisHost}:6379` }).connect();
    console.log("Connected to Redis!");
  } catch (e) {
    console.error("<<<<REDIS ERROR>>>>", e);
  }

  return { redis }
  
};


