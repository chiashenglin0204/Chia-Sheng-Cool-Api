import express from "express";
const { Client } = require("pg");
require("dotenv").config();

console.log(process.env); // remove this after you've confirmed it working

const client = new Client({
  user: process.env.PG_USER,
  //host: "local",
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

client.connect((err: any) => {
  if (err) {
    console.error("postgres connection error", err.stack);
  } else {
    console.log("connected to Chia-Sheng-DB postgres db");
  }
});

// start express server
const app = express();

app.listen(3000, () => {
  console.log("started");
});

app.get("/getCurrentTime", async (req, res) => {
  var currentTime;
  await client.query("SELECT NOW()", (err: any, dbRes: any) => {
    currentTime = dbRes.rows[0];
    console.log(dbRes);

    client.end();
    return res.send(currentTime);
  });
});
