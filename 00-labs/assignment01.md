<div style="text-align: center">
  Instituto Superior de Engenharia de Lisboa
  <div style="font-size: 80%">
  Bachelor in Computer Science and Computer Engineering
  <br>Bachelor in Informatics, Networks and Telecommunications Engineering
  </div>
  Web Programming and Architecture
  <br/>
  Winter Semester of 2026/2027 – <b> 1st practical assignment</b>
</div>


---


# Delivery


This first practical assignment has 2 parts, and it should be **implemented and
delivered individually** by each student in the individual Labs Submission repository.

 The delivery dates are the following:


- [**Part1:**](#part-1---javascript-functions) 12/10/2026 - 23h59.
- [**Part2:**](#part-2---node-application) 17/10/2026 - 23h59.

# Starter project and tests

The Part 1 starter project is provided in the next repository:
https://github.com/isel-leic-ipw/apw-2627-a1-template

It contains one source file per exercise and example tests for
Exercises 1 and 2. Install its dependencies and run the tests with:

```shell
npm install
npm test
```

The supplied tests are expected to fail until the corresponding functions are
implemented. Students must create equivalent tests for Exercises 3, 4, and 5 and
add further tests for Exercises 1 and 2.


## Part 1 - JavaScript Functions


Implement the following JavaScript functions and create tests that confirm the
described behavior:

# Exercise 1 – Validate Array Elements


**Objective:** Write a function `validateArrayElements(arr, elementValidator)`
that validates each element of an array using a given validation function.

**Requirements:** 
- Return an **array of objects**. 
- Each object should have: 
 - `value`: the original element 
 - `isValid`: a boolean indicating whether the element passed the validation 


**Examples:**


**Numbers:**
```javascript
const numbers = [2, 3, 4, 5];
console.log(validateArrayElements(numbers, n => n % 2 === 0));
/*
[
 { value: 2, isValid: true },
 { value: 3, isValid: false },
 { value: 4, isValid: true },
 { value: 5, isValid: false }
]
*/
```


**Objects:**
```javascript
const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];
console.log(validateArrayElements(products, p => p.category.length > 0));
/*
[
 { value: { name: "Laptop", category: "Electronics" }, isValid: true },
 { value: { name: "Shirt", category: "" }, isValid: false },
 { value: { name: "Chair", category: "Furniture" }, isValid: true }
]
*/
```


# Exercise 2 – Validate and Correct Array


**Objective:** Write a function `validateAndCorrectArray(arr, elementValidator,
defaultValue)` that returns an object containing: 


1. `correctedArray`: array with invalid elements replaced by `defaultValue` 
2. `invalidElements`: array of the original invalid elements 


**Requirements:** 
- Use the function from **Exercise 1** to validate each element **only once**. 




**Examples:**


**Numbers:**
```javascript
const numbers = [2, 3, 4, 5];
const result = validateAndCorrectArray(numbers, n => n % 2 === 0, 0);


console.log(result.correctedArray);  // [2, 0, 4, 0]
console.log(result.invalidElements); // [3, 5]
```


**Objects:**
```javascript
const products = [
 { name: "Laptop", category: "Electronics" },
 { name: "Shirt", category: "" },
 { name: "Chair", category: "Furniture" }
];
const defaultProduct = { name: "Unknown", category: "Misc" };
const resultProducts = validateAndCorrectArray(products, p => p.category.length > 0, defaultProduct);


console.log(resultProducts.correctedArray);
/*
[
 { name: "Laptop", category: "Electronics" },
 { name: "Unknown", category: "Misc" },
 { name: "Chair", category: "Furniture" }
]
*/
console.log(resultProducts.invalidElements);
/*
[
 { name: "Shirt", category: "" }
]
*/
```

## Additional test cases

The provided tests cover only the examples above. Add tests for cases such as:

- **Exercise 1:** an empty array; validators that accept all or reject all
  elements; arrays containing values of different types; and verification that
  the validator is called once per element.
- **Exercise 2:** an empty array; arrays where all elements are valid or
  invalid; primitive and object default values; and verification that each
  element is validated only once.

Also create tests for all the requirements of Exercises 3, 4, and 5, including
relevant edge cases.




# Exercise 3 – partitionBy


**Objective:** Write a function `partitionBy(array, predicate)` that splits an
array into two arrays:


- The first contains all elements that **satisfy** the `predicate`. 
- The second contains all elements that **do not satisfy** the `predicate`.




**Examples:**


**Numbers:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partitionBy(numbers, n => n % 2 === 0);
console.log(evens); // [2, 4, 6]
console.log(odds);  // [1, 3, 5]
```


**Objects:**
```javascript
const users = [
   { name: "Alice", age: 25 },
   { name: "Bob", age: 17 },
   { name: "Charlie", age: 30 }
];
const [adults, minors] = partitionBy(users, u => u.age >= 18);
console.log(adults);
/*
[
 { name: "Alice", age: 25 },
 { name: "Charlie", age: 30 }
]
*/
console.log(minors);
/*
[
 { name: "Bob", age: 17 }
]
*/
```


**Hint:** You can use `reduce` to build both arrays in a single pass.


# Exercise 4 – checkItemsExist 


**Objective:** Implement `checkItemsExist(validItems, key)` that **returns a
function**. The returned function takes an array of items and returns `true` if
**all items exist in `validItems` based on the given key**, otherwise `false`. 


**Examples:**


**Products:**
```javascript
const validProducts = [
   { sku: "A123", name: "Laptop" },
   { sku: "B456", name: "Mouse" },
   { sku: "C789", name: "Keyboard" }
];


const checkProducts = checkItemsExist(validProducts, "sku");


console.log(checkProducts([{ sku: "A123" }, { sku: "B456" }])); // true
console.log(checkProducts([{ sku: "A123" }, { sku: "X999" }])); // false
```
**Hint:**
- Use `map` to extract the valid keys.
- Use `every` and `includes` to check if all items exist.




# Exercise 5 – timeExecution


**Objective:** Create a function `timeExecution(object, method)` that overrides
a specified method of an object to measure and log the time it takes to execute.


**Requirements:**
- The original method should still behave as before.
- Every time the method is called, log the execution time in milliseconds.




**Example:**
```javascript
const obj = {
   compute(x) {
       return x * 2; // simplified computation
   }
};


timeExecution(obj, 'compute');
console.log(obj.compute(5)); // Logs execution time, e.g, returns 10
console.log(obj.compute(10)); // Logs execution time, e.g, returns 20
```

**Hint:**
- Use `performance.now()` (or `Date.now()`) to measure time.
- Use `apply` to call the original method with the correct context and
  arguments.


# Part 2 - Node application

## Foreword

This part requires your code to make HTTP requests to the [RAWG Video Games Database API](https://api.rawg.io/docs/).

Each student must obtain an API key from the [RAWG API page](https://rawg.io/apidocs). The key must be included in the `key` query parameter of every HTTP request. For example:

```text
https://api.rawg.io/api/games/3498?key=YOUR_API_KEY
```

The API key must not be hard-coded in the source code or committed to the repository. Read it from an environment variable instead. Be sure you understand and comply with the API terms and request limits.

## Application requirements

The application reads game IDs from a JSON file. A sample file is provided in the assignment repository with the following content:

```json
{
  "game-ids": [
    3498,
    3328,
    4200,
    5286
  ]
}
```

For each ID, request the game details from `GET https://api.rawg.io/api/games/{id}`. The application must produce a JSON file containing each game's ID, name, Metacritic score, and platform names, as shown in the following example:

```json
{
  "games": [
    {
      "id": 3498,
      "name": "Grand Theft Auto V",
      "score": 92,
      "platforms": [
        "PlayStation 5",
        "Xbox Series S/X",
        "PlayStation 3",
        "PC",
        "PlayStation 4",
        "Xbox 360",
        "Xbox One"
      ]
    },
    {
      "id": 3328,
      "name": "The Witcher 3: Wild Hunt",
      "score": 92,
      "platforms": [
        "PlayStation 5",
        "Xbox Series S/X",
        "macOS",
        "PlayStation 4",
        "Nintendo Switch",
        "PC",
        "Xbox One"
      ]
    },
    {
      "id": 4200,
      "name": "Portal 2",
      "score": 95,
      "platforms": [
        "PlayStation 3",
        "PC",
        "Xbox 360",
        "Linux",
        "macOS",
        "Xbox One"
      ]
    },
    {
      "id": 5286,
      "name": "Tomb Raider",
      "score": 86,
      "platforms": [
        "PlayStation 3",
        "Xbox 360",
        "macOS",
        "PC"
      ]
    }
  ]
}
```

Implement two versions of the application:

1. Using Promises explicitly
2. Using the async/await style

REMARK: Students must handle request and file-system errors and consider the RAWG API request limits.

