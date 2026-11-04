/**
 * @typedef {Object} Item
 * @property {string} id Item identifier, unique within its list.
 * @property {string} name Name of the item.
 * @property {number} quantity Quantity of the item.
 * @property {boolean} bought Whether the item was already bought.
 */

/**
 * @typedef {Object} ShoppingList
 * @property {string} id List identifier.
 * @property {string} name Name of the list.
 * @property {Object<string, Item>} items Items of the list, indexed by item id.
 */

/**
 * In-memory storage: the lists indexed by list id.
 * @type {Object<string, ShoppingList>}
 */
const lists = {
  1: {
    id: "1",
    name: "Groceries",
    items: {
      1: { id: "1", name: "Milk", quantity: 2, bought: false },
      2: { id: "2", name: "Bread", quantity: 1, bought: true },
    },
  },
  2: {
    id: "2",
    name: "Party",
    items: {
      1: { id: "1", name: "Balloons", quantity: 20, bought: false },
    },
  },
};

let nextListId = 3;
const nextItemIds = { 1: 3, 2: 2 };

/**
 * Returns all stored lists.
 * @returns {Promise<ShoppingList[]>} Resolves with the stored lists.
 */
export async function getLists() {
  return Object.values(lists);
}

/**
 * Returns a list by id.
 * @param {string} listId Identifier of the list.
 * @returns {Promise<ShoppingList|undefined>} Resolves with the list, or
 * undefined if it does not exist.
 */
export async function getList(listId) {
  return lists[listId];
}

/**
 * Stores a new, empty list and assigns it an id.
 * @param {string} name Name of the new list.
 * @returns {Promise<string>} Resolves with the id of the new list.
 */
export async function createList(name) {
  const id = String(nextListId++);
  lists[id] = { id, name, items: {} };
  nextItemIds[id] = 1;
  return id;
}

/**
 * Updates the name of a stored list.
 * @param {string} listId Identifier of the list.
 * @param {string} name New name.
 * @returns {Promise<boolean>} Resolves with true if the list was updated,
 * false if it does not exist.
 */
export async function updateList(listId, name) {
  if (!lists[listId]) return false;
  lists[listId].name = name;
  return true;
}

/**
 * Removes a list and all its items.
 * @param {string} listId Identifier of the list.
 * @returns {Promise<boolean>} Resolves with true if the list was removed,
 * false if it does not exist.
 */
export async function deleteList(listId) {
  if (!lists[listId]) return false;
  delete lists[listId];
  delete nextItemIds[listId];
  return true;
}

/**
 * Returns an item of a list.
 * @param {string} listId Identifier of the list.
 * @param {string} itemId Identifier of the item.
 * @returns {Promise<Item|undefined>} Resolves with the item, or undefined if
 * the list or the item does not exist.
 */
export async function getItem(listId, itemId) {
  return lists[listId]?.items[itemId];
}

/**
 * Stores a new item in a list and assigns it an id. The item starts as not
 * bought.
 * @param {string} listId Identifier of the list.
 * @param {string} name Name of the item.
 * @param {number} quantity Quantity of the item.
 * @returns {Promise<string|undefined>} Resolves with the id of the new item,
 * or undefined if the list does not exist.
 */
export async function createItem(listId, name, quantity) {
  const list = lists[listId];
  if (!list) return undefined;
  const id = String(nextItemIds[listId]++);
  list.items[id] = { id, name, quantity, bought: false };
  return id;
}

/**
 * Sets the bought status of an item.
 * @param {string} listId Identifier of the list.
 * @param {string} itemId Identifier of the item.
 * @param {boolean} bought New bought status.
 * @returns {Promise<boolean>} Resolves with true if the item was updated,
 * false if the list or the item does not exist.
 */
export async function updateItemStatus(listId, itemId, bought) {
  const item = lists[listId]?.items[itemId];
  if (!item) return false;
  item.bought = bought;
  return true;
}

/**
 * Removes an item from a list.
 * @param {string} listId Identifier of the list.
 * @param {string} itemId Identifier of the item.
 * @returns {Promise<boolean>} Resolves with true if the item was removed,
 * false if the list or the item does not exist.
 */
export async function deleteItem(listId, itemId) {
  if (!lists[listId]?.items[itemId]) return false;
  delete lists[listId].items[itemId];
  return true;
}
