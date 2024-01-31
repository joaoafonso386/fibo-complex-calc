import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import { keys } from "./keys.js";
import pg from "pg";
import { initRedis } from "../common/redis.mjs"
import { initPg } from "../common/pg.mjs"
import { createClient } from "redis";

const app = express()
app.use(cors())
app.use(bodyParser.json())

const { Pool } = pg 
const pgClient = initPg(keys, Pool)

const { redis, redisPublisher } = initRedis(keys, createClient)

app.get("/", (req, res) => {
  res.send("hi")
})

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values')
  res.send(values.rows)
})

app.get("/values/current", async (req, res) => {
  redis.hgetall('values', (e, values) => {
  res.send(values)
  })
})

app.post("/values", async (req, res) => {
  const index = req.body.index
  if(parseInt(index) > 40) {
    return res.send(422).send('Index to high')
  }

  redis.hset('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  res.send({ working: true })
})

app.listen(5000, (e) => console.log("Listening on port 5000"))