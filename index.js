const express = require("express");
const app = express();


const bodyParser = require("body-parser");
const pool = require("./database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  const conn = await pool.getConnection();

  /* create a new query*/
  const query = "select * from products";

  const rows = await conn.query(query);

  res.status(200).json(rows);
});

app.post("/new-product", async (req, res) => {
  const conn = await pool.getConnection();

  /* create a new query*/
  const query = "INSERT INTO products VALUE (?)";

  const result = await conn.query(query, [req.body]);

  res.status(200).json(JSON.stringify(result, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
  .replace(/"(-?\d+)n"/g, (_, a) => a));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
