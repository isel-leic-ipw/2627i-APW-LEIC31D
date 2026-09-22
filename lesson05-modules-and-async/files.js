import fs from "fs";
import { readFile } from "fs/promises";

function countCharsSync(file) {
  const data = fs.readFileSync(file, "utf-8");
  return data.length;
}

export function printCountCharsSync(folder, path) {
  const file = folder + "/" + path;
  console.log(path + " -> " + countCharsSync(file) + " chars");
}

function countCharsAsync(file, cb) {
  const data = fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data.length);
    }
  });
}

export function printCountCharsAsync(folder, path, cb) {
  const file = folder + "/" + path;
  countCharsAsync(file, (err, size) => {
    if (err) cb(err);
    else {
      console.log(path + " -> " + size + " chars");
      cb();
    }
  });
}

function countChars(file) {
  const p = readFile(file, "utf-8");
  return p.then((data) => data.length);
}

export function printCountChars(folder, path) {
  const file = folder + "/" + path;
  return countChars(file)
    .then((size) => console.log(path + " -> " + size + " chars"));
}
