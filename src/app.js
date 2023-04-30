const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.set("strictQuery", false);

// for a post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

// mockData-JSON
const customers = [
  {
    name: "Gluay",
    industry: "software development",
  },
  {
    name: "Feynman",
    industry: "meow and nap",
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

app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/", (req, res) => {
  res.send("This is a post request!");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => {
      console.log("App is listening on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};
// call-invoke function here..
start();
