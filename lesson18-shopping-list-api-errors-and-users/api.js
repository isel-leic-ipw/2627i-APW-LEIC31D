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
  if (!req.body)
    return res.status(400).json({ message: "Missing body parameters." });
  if (!req.params.listId)
    return res
      .status(400)
      .json({ message: "Missing shopping list identifier." });
  const { name, quantity } = req.body;
  // Validation on HTTP parameters:
  // - If the name is a string
  // - If the quantity is a Number
  if (isNaN(quantity))
    return res.status(400).json({ message: "Quantity should be a number" });
  if (typeof name !== "string")
    return res.status(400).json({ message: "Name should be a string" });

  services
    .createListItem(req.params.listId, req.body.name, req.body.quantity)
    .then((id) => res.json({ id }))
    .catch(err => {
      switch(err.code) {
        case 1: return res.status(404).json(err.message);
        case 2: return res.status(400).json(err.message);
        default: return res.status(500).json(err.message);
      }
    })
}

// Removes the item `itemId` from the list `listId`.
export function deleteListItem(req, res) {
  notImplemented(req, res);
}

// Toggles the item `itemId` of list `listId` between pending and bought.
export function toggleListItemStatus(req, res) {
  notImplemented(req, res);
}
