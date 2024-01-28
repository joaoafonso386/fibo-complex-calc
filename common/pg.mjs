export const initPg = (keys, Pool) => {

    const pgClient = new Pool({
        user: keys.pgUser,
        host: keys.pgHost,
        database: keys.pgDb,
        password: keys.pgPass,
        port: keys.pgPort,
        ssl:
          process.env.NODE_ENV !== 'production'
            ? false
            : { rejectUnauthorized: false },
    });

    return { pgClient }

}
