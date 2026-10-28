# Shopping List Web App

## Design of HTTP API

### Features

* Manage shopping lits:
  - create a new lits;
  - get available lists;
  - update the name of a list;
  - delete a list.
* Manage the items of list:
  - Add a new item;
  - Remove an item;
* Shopping list item is described by: 
  - name
  - quantity
  - bought, or not 

### Routes

Guidelines:
* Routes - For each feature we need to define a route = pair (METHOD, PATH). 
* Routes - Think in **Resources**.  
* What are the resources of shopping list: **Lists**, **Items**, 
* Good practice: Do not MIX Verbs with Paths
* Good practice: Uses Paths in Plural
* Good practice: Nesting paths

Routes:
- GET `/lists` - return available lists
- POST `/lists` - create a new List it returns the id of that list (id is
  managed by the server)
  - Body Parameters (JSON): 
    - name String
- PUT `/lists/{id}` - update an existing List
- DELETE `/lists/{id}` - delete an existing List
- DELETE `/lists/{id}/items/{id}` - delete an existing item from a List
- POST `/lists/{id}/items` - create and insert an item in a List and returns the
  item id
  - Body parameters (JSON):
    - name String
    - quantity Number
- POST /lists/{id}/items/{id}/status - Change the Status from pending to bought
  or vice-versa.

***

Discarded alternatives:
  - Create a new List:
    - /lists/create - Avoid!!!
  - Get Items:
    - /items?litsname=...
