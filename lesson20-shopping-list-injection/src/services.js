import * as data from "./data-mem.js";

/**
 * @typedef {Object} ShoppingList
 * @property {string} id Server-managed list identifier.
 * @property {string} name Name of the list.
 */

export function getUserByToken(token) {
  return data.getUserByToken(token);
}

/**
 * Returns the available shopping lists.
 * @returns {Promise<ShoppingList[]>} Resolves with the available lists.
 */
export function getLists() {}

/**
 * Creates a new shopping list.
 * @param {string} name Name of the new list.
 * @returns {Promise<string>} Resolves with the id of the created list.
 */
export function createList(name) {}

/**
 * Updates the name of an existing shopping list.
 * @param {string} listId Identifier of the list to update.
 * @param {string} name New name of the list.
 * @returns {Promise<void>} Resolves when the list is updated. Rejects if the
 * list does not exist.
 */
export function updateList(listId, name) {}

/**
 * Deletes an existing shopping list.
 * @param {string} listId Identifier of the list to delete.
 * @returns {Promise<void>} Resolves when the list is deleted. Rejects if the
 * list does not exist.
 */
export function deleteList(listId) {}

/**
 * Creates an item and inserts it in a shopping list.
 * @param {user} user The user that should own the list with listId
 * @param {string} listId Identifier of the list that receives the item.
 * @param {string} name Name of the item.
 * @param {number} quantity Quantity of the item; must be greater than 0.
 * @returns {Promise<string>} Resolves with the id of the created item. Rejects
 * if the list does not exist or the quantity is not greater than 0.
 */
export async function createListItem(user, listId, name, quantity) {
  // Validation on Domain logic:
  // - Check if that list with listId exist?
  // - Check if the quantity is greater than 0
  // - Check if the list with listId belongs to the given user
  // If all validations pass then we will insert the Item in the List.
  const list = await data.getList(listId);
  if (list === undefined)
    throw { code: 1, message: "There is no List with id: " + listId };
  if (quantity <= 0)
    throw {
      code: 2,
      message: "You cannot create items with quantity lower than 0",
    };
  if(!user) {
    throw {
      code: 3,
      message:
        "Missing user.",
    };
  }
  if (list.userId != user.userId) {
    throw {
      code: 4,
      message:
        "You cannot change a list that does not belong to the right user.",
    };
  }
  return data.createItem(listId, name, quantity);
}

/**
 * Removes an item from a shopping list.
 * @param {string} listId Identifier of the list that contains the item.
 * @param {string} itemId Identifier of the item to remove.
 * @returns {Promise<void>} Resolves when the item is removed. Rejects if the
 * list or the item does not exist.
 */
export function deleteListItem(listId, itemId) {}

/**
 * Toggles an item's status between pending and bought.
 * @param {string} listId Identifier of the list that contains the item.
 * @param {string} itemId Identifier of the item whose status changes.
 * @returns {Promise<void>} Resolves when the status is changed. Rejects if the
 * list or the item does not exist.
 */
export function toggleListItemStatus(listId, itemId) {}
