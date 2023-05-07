import { HydratedDocument, Schema, model } from "mongoose";

interface ICustomer {
  name: string;
  industry?: string;
  orders?: IOrder[];
}
interface IOrder {
  description: string;
  amountInCents?: number;
}
// ? is optional -- just in case you need it or don't need it

const customerSchema = new Schema<ICustomer>({
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

const Customer = model("customer", customerSchema);
//check it in mongoose - has value and types
const c: HydratedDocument<ICustomer> = new Customer({
  name: "Gluay",
  industry: "software development",
});
// check it in backend npx nodemon
console.log(c.name);

export default Customer;
