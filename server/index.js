import { keys } from "./keys";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import { Pool } from "pg";

const app = express()
app.use(cors())
app.use(bodyParser.json())

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

pgClient.on("connect", (client) => {
client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});