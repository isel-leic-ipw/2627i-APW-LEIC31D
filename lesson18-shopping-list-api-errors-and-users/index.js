import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import * as api from "./api.js";

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
app.post("/lists", api.createList);
app.put("/lists/:listId", api.updateList);
app.delete("/lists/:listId", api.deleteList);
app.post("/lists/:listId/items", api.createListItem);
app.delete("/lists/:listId/items/:itemId", api.deleteListItem);
app.post("/lists/:listId/items/:itemId/status", api.toggleListItemStatus);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
