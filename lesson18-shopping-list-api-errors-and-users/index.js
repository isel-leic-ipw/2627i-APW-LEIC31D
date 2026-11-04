import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import * as api from "./api.js";
import * as services from "./services.js";

const file = fs.readFileSync("./openapi.yaml", "utf8");
const openapiSpec = YAML.parse(file);

const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/lists", api.getLists);

// From here next endpoints require an Authenticated user
app.use((req, res, next) => {
  if (
    !req.headers.authorization || // 1. Check if the Authorization header exists.
    req.headers.authorization.indexOf("Bearer") < 0 // 2. Check if the Authorization scheme is Bearer
  )
    return res.header(" WWW-Authenticate", "Bearer").status(401).send();
  // 3. Extract the token and get a valid user for that token.
  //   > If not send 401 with Invalid Token
  const arr = req.headers.authorization.split("Bearer ");
  services.getUserByToken(arr[1]).then((user) => {
    if (!user)
      return res.status(401).json({ message: "Not user for given token" });
    // If we pass al conditions then proceed to next middleware or handler:
    //   a. req.user = <user object> // Adds a user property to the Request object
    //   b. next() // Proceed to the next mw or handler
    req.user = user;
    next();
  });
});
app.post("/lists", api.createList);
app.put("/lists/:listId", api.updateList);
app.delete("/lists/:listId", api.deleteList);
app.post("/lists/:listId/items", api.createListItem);
app.delete("/lists/:listId/items/:itemId", api.deleteListItem);
app.post("/lists/:listId/items/:itemId/status", api.toggleListItemStatus);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
