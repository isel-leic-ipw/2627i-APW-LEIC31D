import { map, filter } from "./functions.js";
import { printCountCharsSync, printCountChars, printCountCharsAsync } from "./files.js";

const numbers = [1, 2, 3, 4, 5];
const even = filter(numbers, (n) => n % 2 === 0);
console.log(even); // even: [2, 4]

const doubled = map(numbers, (n) => n * 2);
console.log(doubled);
// doubled: [2, 4, 6, 8, 10]

const files = [
  "lab00-git.md",
  "lab01-intro.md",
  "lab02-js.md",
  "lab03-modules-and-async.md",
  "liga.json",
];

console.time("countChars synchronous");
files.forEach((file) => printCountCharsSync("./../00-labs", file));
console.timeEnd("countChars synchronous");

console.log("****************************");

// console.time("countChars Async")
// let completed = 0
// files.forEach(file => {
//   printCountCharsAsync("./../00-labs", file, () => {
//     completed++
//     if(completed == files.length)
//       console.timeEnd("countChars Async")
//   })
// })

console.time("countChars Promises");
let completed = 0;
files.forEach((file) => {
  printCountChars("./../00-labs", file).then(() => {
    completed++;
    if (completed == files.length) {
      console.timeEnd("countChars Promises");
    }
  });
});
