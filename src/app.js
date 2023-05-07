const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const cors = require("cors");

const app = express();
mongoose.set("strictQuery", false);

app.use(cors());

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
  // console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.send({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: "user not found!" });
    } else {
      res.json({ customer });
    }
  } catch (e) {
    res.status(500).json({ error: "something went wrong!" });
  }
});

// UPDATE - EDIT
app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndReplace(
      { _id: customerId },
      req.body,
      { new: true }
    );
    console.log(customer);
    res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: "something went wrong!" });
  }
});

// PATCH - Specific field updated
app.patch("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      req.body,
      { new: true }
    );
    console.log(customer);
    res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: "something went wrong!" });
  }
});

// DELETE
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(500).json({ error: "something went wrong!" });
  }
});

// POST Request == CREATE
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

// Endpoint Modify Nested Data - replace individual order api/orders/id
app.patch("/api/orders/:id", async (req, res) => {
  console.log(req.params);
  const orderId = req.params.id;
  // not have to get a new id (prevent in MongoDB)
  req.body._id = orderId;
  try {
    const result = await Customer.findOneAndUpdate(
      { "orders._id": orderId },
      {
        $set: { "orders.$": req.body },
      },
      { new: true }
    );
    console.log(result);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "something went wrong!" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "something went wrong!" });
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
