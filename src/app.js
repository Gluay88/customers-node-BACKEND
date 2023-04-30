const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");

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

const customer = new Customer({
  name: "feynman",
  industry: "nap department",
});

// GET Request
app.get("/", (req, res) => {
  res.send("Welcome to Nap Department");
});

app.get("/api/customers", async (req, res) => {
  //   console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.send({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  res.json({ requestParams: req.params });
});

// POST Request
app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
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
