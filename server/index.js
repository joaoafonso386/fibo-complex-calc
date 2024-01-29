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

const { client } = initRedis(keys, createClient)
const sub = client.duplicate();

app.get("/", (req, res) => {
  res.send("hi")
})

app.get("/values/all", async (req, res) => {
  const values = await pgClient.client('SELECT * FROM values')
  res.send(values.rows)
})

app.get("/values/current", async (req, res) => {
  client.hgetall('values', (e, values) => {
  res.send(values)
  })
})

app.post("/values", async (req, res) => {
  const index = req.body.index
  if(parseInt(index) > 40) {
    return res.send(422).send('Index to high')
  }

  client.hset('values', index, 'Nothing yet!')
  client.publish('values', index, 'Nothing yet!')
})

app.listen(5000, (e) => console.log("Listening on port 5000"))