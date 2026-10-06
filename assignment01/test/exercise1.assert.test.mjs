import assert from "node:assert/strict";
import { validateArrayElements } from "../src/exercise1.mjs";

describe("Exercise 1 - validateArrayElements (Node assert)", function () {
  it("validates the numbers from the assignment example", function () {
    const numbers = [2, 3, 4, 5];

    const result = validateArrayElements(numbers, number => number % 2 === 0);

    assert.deepStrictEqual(result, [
      { value: 2, isValid: true },
      { value: 3, isValid: false },
      { value: 4, isValid: true },
      { value: 5, isValid: false }
    ]);
  });

  it("validates the products from the assignment example", function () {
    const products = [
      { name: "Laptop", category: "Electronics" },
      { name: "Shirt", category: "" },
      { name: "Chair", category: "Furniture" }
    ];

    const result = validateArrayElements(
      products,
      product => product.category.length > 0
    );

    assert.deepStrictEqual(result, [
      { value: products[0], isValid: true },
      { value: products[1], isValid: false },
      { value: products[2], isValid: true }
    ]);
  });
});