Q: Why use UUID instead of ID?
A: By using UUIDs, you ensure that your ID is not just unique in the context of a single database table, but is unique in the universe. No other ID in the world should be match the value of yours.

Q: Benefit of using UUID
A: Answers down below ⬇️

1. They are unique across every table, every database and every server
2. They allow easy merging of records from different databases
3. They allow easy distribution of databases across multiple servers
4. You can generate UUID anywhere, both Frontend side and Backend side

Q: UUID format
A: 32 => 8-4-4-4-12 bc2d0f53-5041-46e8-a14c-267875a49f0c

https://www.toptal.com/developers/gitignore/api/node
For .gitignore

This is how I start my backend using node and express..
`npm i express`
`npm i nodemon`
`"start": "npx nodemon src/app.js"`

JSON Validator Website ➡️ https://jsonlint.com/
JavaScript Object Notation is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).

for a POST request
`app.use(express.json());`
`app.use(express.urlencoded({ extended: true }));`

MongoDB setup Cloud database
You changed the password in your note

- npm install mongodb
- npm i mongoose

```
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gluaysmedley:<password>@cluster0.ozpmoul.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
```

`npm i dotenv`
use if statement

```
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
```

if not run this command in terminal
`NODE_ENV=production npm start`
