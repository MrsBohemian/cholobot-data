const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

let calendar = {
  handley_man: {},
  heaven: {},
  daniel: {}
};

let tasks = {};

app.get("/", (req, res) => {
  res.send("cholobot-data running");
});

app.get("/calendar", (req, res) => {
  res.json(calendar);
});

app.get("/chisme_followups.json", (req, res) => {
  res.sendFile(path.join(__dirname, "chisme_followups.json"));
});

app.post("/calendar", (req, res) => {
  const { calendarKey, schedule } = req.body;

  if (!calendarKey || !schedule) {
    return res.status(400).json({
      ok: false,
      error: "calendarKey and schedule are required"
    });
  }

  const validKeys = ["handley_man", "heaven", "daniel"];

  if (!validKeys.includes(calendarKey)) {
    return res.status(400).json({
      ok: false,
      error: "Invalid calendarKey"
    });
  }

  calendar[calendarKey] = schedule;

  console.log(`Updated ${calendarKey} calendar:`, schedule);

  res.json({
    ok: true,
    calendar
  });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  tasks = req.body;
  console.log("Updated tasks:", tasks);
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Data service running");
});
