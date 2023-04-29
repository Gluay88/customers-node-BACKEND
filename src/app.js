const express = require("express");
const app = express();
const PORT = 3000;

// try out JSON
const customers = [
  {
    name: "Gluay",
    industry: "Software Development",
  },
  {
    name: "Feynman",
    industry: "Meow and Nap",
  },
  {
    name: "Kendrick",
    industry: "Music",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my node site!");
});

app.get("/api/customers", (req, res) => {
  res.send({ customers: customers });
});

app.post("/", (req, res) => {
  res.send("This is a post request!");
});

app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
