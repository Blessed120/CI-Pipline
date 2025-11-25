const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from CI/CD Pipeline!" });
});

module.exports = app;
