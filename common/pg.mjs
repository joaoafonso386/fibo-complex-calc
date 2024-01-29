export const initPg = (keys, Pool) => {
  let pgClient
  
  try {
    pgClient = new Pool({
      user: keys.pgUser,
      host: keys.pgHost,
      database: keys.pgDb,
      password: keys.pgPass,
      port: keys.pgPort,
      ssl:
        process.env.NODE_ENV !== "production"
          ? false
          : { rejectUnauthorized: false },
    });
  } catch (e) {
    console.error(e);
  }

  return { pgClient };
};
