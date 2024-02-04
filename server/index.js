import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import pg from 'pg'
import { keys } from "./keys.js";
import { initPg } from "../common/pg.mjs"
import { initRedis } from "../common/redis.mjs"
import { createClient } from "redis";

const app = express()
app.use(cors())
app.use(bodyParser.json())

const { pgClient } = initPg(keys, pg)
const { redis } = await initRedis(keys, createClient)

app.get("/", (req, res) => {
  res.send("hi")
})

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values')
  res.send(values.rows)
})

app.get("/values/current", async (req, res) => {
  const values = await redis.hGetAll('values')
  res.send(values)
})

app.post("/values", async (req, res) => {
  const index = req.body.index
  if(parseInt(index) > 40) {
    return res.send(422).send('Index to high')
  }

  await redis.hSet('values', index, 'Nothing yet!')
  await pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  res.send({ working: true })
})

app.listen(5000, (e) => console.log("Listening on port 5000"))