export const initPg = (keys, pg) => {
  let pgClient
  
  try {
    pgClient = new pg.Pool({
      user: keys.pgUser,
      database: keys.pgDb,
      password:  keys.pgPass,
      port: keys.pgPort,
      ssl:
        process.env.NODE_ENV !== "production"
          ? false
          : { rejectUnauthorized: false },
    });

    pgClient.on("connect", (client) => {
      client
          .query("CREATE TABLE IF NOT EXISTS values (number INT)")
          .catch((err) => console.error(err));
      });
    console.log("Connected to Postgres!");
  } catch (e) {
    console.error(e);
  }

  return { pgClient };
};
