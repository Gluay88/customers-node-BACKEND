"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// ? is optional -- just in case you need it or don't need it
const customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: String,
    orders: [
        {
            description: String,
            amountInCents: Number,
        },
    ],
});
const Customer = (0, mongoose_1.model)("customer", customerSchema);
//check it in mongoose - has value and types
const c = new Customer({
    name: "Gluay",
    industry: "software development",
});
// check it in backend npx nodemon
console.log(c.name);
exports.default = Customer;
