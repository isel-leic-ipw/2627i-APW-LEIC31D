import express from "express";
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log("Request received");
  next();
});

app.use(express.json()) // creates a property body in request Object = result of JSON.parse(request stream)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/hello", (req, res) => {
  console.log("Posting");
  // readBody(req).then((body) => {
  //   const obj = JSON.parse(body);
  //   console.log(obj.name);
  // });
  console.log(req.body.name)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * @returns Promise<String>
 */
async function readBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  return body;
}
