- Q: Why use UUID instead of ID?
- A: By using UUIDs, you ensure that your ID is not just unique in the context of a single database table, but is unique in the universe. No other ID in the world should be match the value of yours.

- Q: Benefit of using UUID
- A: Answers down below ⬇️

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

`npm i dotenv`
use if statement

```
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
```

if not run this command in terminal
`NODE_ENV=production npm start`

Query Prerameter for Postman-MongoDB

```
http://localhost:3005/api/customers?id=644dd0c2bf8c46bd26fd0499
```

```
http://localhost:3005/api/customers/644dd0c2bf8c46bd26fd0499
```

```
app.get("/api/customers/:id", async (req, res) => {
  res.json({ requestParams: req.params });
});
```

Link Backend to Frontend
`npm i cors`

\*\*\* I decided to use Typescript

```
npm i -D typescript
or
npm i -g typescript
```

- generante tsconfig.json for typscript

```
tsc --init
```

```
tsc src/index.tsx
```

-compile project

```
tsc -p tsconfig.json
```

- if you comfile and get some errors
  add this line to ignore it

```
//@ts-nocheck
```

- anything change has made it is going to complie and generate again

```
tsc -p tsconfig.json --watch
```

- add --watch moden to keep track what have been changed

```
"scripts": {
    "start": "npx nodemon",
    "watch": "tsc -p tsconfig.json --watch'"
  }
```

in tsconfig.json
Type Checking section chagne
``
noImplicitAny:false

```

```

useUnknownInCatchVariables": false

```

```

npm i @types/express

```

```

noImplicitAny:true

```

```

```
async (req: Request, res: Response)
```
