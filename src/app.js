"use strict";
// @ts-nocheck
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
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
  res.send("Welcome to Mr.Feynman Department");
});
app.get("/api/customers", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try {
      const result = yield Customer.find();
      res.send({ customers: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
);
app.get("/api/customers/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id: customerId } = req.params;
      const customer = yield Customer.findById(customerId);
      if (!customer) {
        res.status(404).json({ error: "user not found!" });
      } else {
        res.json({ customer });
      }
    } catch (e) {
      res.status(500).json({ error: "something went wrong!" });
    }
  })
);
// UPDATE - EDIT
app.put("/api/customers/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const customerId = req.params.id;
      const customer = yield Customer.findOneAndReplace(
        { _id: customerId },
        req.body,
        { new: true }
      );
      console.log(customer);
      res.json({ customer });
    } catch (e) {
      res.status(500).json({ error: "something went wrong!" });
    }
  })
);
// PATCH - Specific field updated
app.patch("/api/customers/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const customerId = req.params.id;
      const customer = yield Customer.findOneAndUpdate(
        { _id: customerId },
        req.body,
        { new: true }
      );
      console.log(customer);
      res.json({ customer });
    } catch (e) {
      res.status(500).json({ error: "something went wrong!" });
    }
  })
);
// DELETE
app.delete("/api/customers/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const customerId = req.params.id;
      const result = yield Customer.deleteOne({ _id: customerId });
      res.json({ deletedCount: result.deletedCount });
    } catch (e) {
      res.status(500).json({ error: "something went wrong!" });
    }
  })
);
// POST Request == CREATE
app.post("/api/customers", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const customer = new Customer(req.body);
    try {
      yield customer.save();
      res.status(201).json({ customer });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  })
);
// Endpoint Modify Nested Data - replace individual order api/orders/id
app.patch("/api/orders/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const orderId = req.params.id;
    // not have to get a new id (prevent in MongoDB)
    req.body._id = orderId;
    try {
      const result = yield Customer.findOneAndUpdate(
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
        res.status(404).json({ error: "Order not found!" });
      }
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "something went wrong!" });
    }
  })
);
// GET Order Id - Endpoint
app.get("/api/orders/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield Customer.findOne({ "orders._id": req.params.id });
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ eror: "Order not found!" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "something went wrong!" });
    }
  })
);
app.post("/", (req, res) => {
  res.send("This is a post request!");
});
const start = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield mongoose.connect(CONNECTION);
      app.listen(PORT, () => {
        console.log("App is listening on port " + PORT);
      });
    } catch (e) {
      console.log(e.message);
    }
  });
// call-invoke function here..
start();
