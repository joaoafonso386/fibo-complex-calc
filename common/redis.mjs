export const initRedis = async (keys, createClient) => {
  let client
  
  try {
    client = await createClient({
      legacyMode: true,
      socket: {
        host: keys.redisHost,
        reconnectStrategy: () => 1000,
      },
    }).connect();
    console.log("Connected to Redis!");
  } catch (e) {
    console.error("Redis Client Error", e);
  }

  return { client }
  
};


