const express = require("express");
const app = express();
const Router = require("./data");

app.use(express.json());

app.use(Router);

app.listen("3020", () => {
  console.log("Server running at 3001");
});

module.exports = app;