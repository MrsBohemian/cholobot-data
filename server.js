const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let calendar = {};
let tasks = {};

app.get("/", (req, res) => {
  res.send("cholobot-data running");
});

app.get("/calendar", (req, res) => res.json(calendar));
app.post("/calendar", (req, res) => {
  calendar = req.body;
  console.log("Updated calendar:", calendar);
  res.json({ ok: true });
});

app.get("/tasks", (req, res) => res.json(tasks));
app.post("/tasks", (req, res) => {
  tasks = req.body;
  console.log("Updated tasks:", tasks);
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Data service running");
});
