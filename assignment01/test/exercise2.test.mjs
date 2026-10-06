import { expect } from "chai";
import { validateAndCorrectArray } from "../src/exercise2.mjs";

describe("Exercise 2 - validateAndCorrectArray", function () {
  it("corrects the numbers from the assignment example", function () {
    const numbers = [2, 3, 4, 5];

    const result = validateAndCorrectArray(
      numbers,
      number => number % 2 === 0,
      0
    );

    expect(result.correctedArray).to.deep.equal([2, 0, 4, 0]);
    expect(result.invalidElements).to.deep.equal([3, 5]);
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

    expect(result.correctedArray).to.deep.equal([
      products[0],
      defaultProduct,
      products[2]
    ]);
    expect(result.invalidElements).to.deep.equal([products[1]]);
  });
});
