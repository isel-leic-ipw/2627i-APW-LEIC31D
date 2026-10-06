import assert from "node:assert/strict";
import { validateAndCorrectArray } from "../src/exercise2.mjs";

describe("Exercise 2 - validateAndCorrectArray (Node assert)", function () {
  it("corrects the numbers from the assignment example", function () {
    const numbers = [2, 3, 4, 5];

    const result = validateAndCorrectArray(
      numbers,
      number => number % 2 === 0,
      0
    );

    assert.deepStrictEqual(result.correctedArray, [2, 0, 4, 0]);
    assert.deepStrictEqual(result.invalidElements, [3, 5]);
  });

  it("corrects the products from the assignment example", function () {
    const products = [
      { name: "Laptop", category: "Electronics" },
      { name: "Shirt", category: "" },
      { name: "Chair", category: "Furniture" }
    ];
    const defaultProduct = { name: "Unknown", category: "Misc" };

    const result = validateAndCorrectArray(
      products,
      product => product.category.length > 0,
      defaultProduct
    );

    assert.deepStrictEqual(result.correctedArray, [
      products[0],
      defaultProduct,
      products[2]
    ]);
    assert.deepStrictEqual(result.invalidElements, [products[1]]);
  });
});