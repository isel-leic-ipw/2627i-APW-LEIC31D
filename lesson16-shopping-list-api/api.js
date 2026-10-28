import * as services from "./services.js";

function notImplemented(req, res) {
  res.status(501).json({ error: "Not implemented" });
}

// Returns the available shopping lists.
export function getLists(req, res) {
  notImplemented(req, res);
}

// Creates a new shopping list from the body `name` and returns its
// server-generated id.
export function createList(req, res) {
  notImplemented(req, res);
}

// Updates the name of the shopping list identified by `listId`.
export function updateList(req, res) {
  notImplemented(req, res);
}

// Deletes the shopping list identified by `listId`.
export function deleteList(req, res) {
  notImplemented(req, res);
}

// Adds an item (`name`, `quantity`) to the list `listId` and returns the new
// item id.
export function createListItem(req, res) {
  // 1. Extract the List Id from req.params
  // 2. Extract the (`name`, `quantity`) from req.body
  // Validation on HTTP parameters:
  // - Check if it has body.
  // - If the name is a string
  // - If the quantity is a Number
  // TO DO: validations
  const id = services.createListItem(req.params.listId, req.body.name, req.body.quantity);
  // Send the response as:
  //    { "id": "string" }
}

// Removes the item `itemId` from the list `listId`.
export function deleteListItem(req, res) {
  notImplemented(req, res);
}

// Toggles the item `itemId` of list `listId` between pending and bought.
export function toggleListItemStatus(req, res) {
  notImplemented(req, res);
}
