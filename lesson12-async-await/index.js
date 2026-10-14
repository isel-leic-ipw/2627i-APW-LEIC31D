"use strict";

function fetchBodySyze(uri) {
  console.log("Fetching " + uri);
  return fetch(uri)
    .then((resp) => resp.text())
    .then((body) => {
      const size = body.length
      console.log(size + " ---> " + uri);
      return size;
    });
}

function fetchAndSum(...uris) {
  const promises = []; // Array<Promise<number>>
  for (const uri of uris) {
    promises.push(fetchBodySyze(uri));
  }
  return new Promise((resolve, reject) => {
    let count = 0; // Count received responses
    let sum = 0; // accumulator that collects the sum of sizes
    for (const p of promises) {
      p.then((size) => {
        sum += size;
        count++;
        if (count == promises.length) {
          // Quando tiver a soma dos sizes de todos os bodies
          // => chamar resolve(soma)
          resolve(sum);
        }
      });
    }
  });
}

async function asyncFetchAndSum(...uris) {
  let sum = 0; // accumulator that collects the sum of sizes
  for (const uri of uris) {
    const size = await fetchBodySyze(uri)
    sum += size;
  }
  return sum;
}

async function asyncFetchAndSumConcurrent(...uris) {
  const promises = []; // Array<Promise<number>>
  for (const uri of uris) {
    promises.push(fetchBodySyze(uri));
  }
  let sum = 0;
  for (const p of promises) {
    sum += await p
  }
  return sum;
}



async function asyncFetchBodySyze(uri) {
  const p = fetch(uri); // Promise<Response>
  const resp = await p; // Response;
  const body = await resp.text(); // String
  return body.length;
}

asyncFetchAndSumConcurrent(
  "https://en.wikipedia.org/",
  "https://github.com/",
  "https://developer.mozilla.org/en-US/",
)
  .catch((err) => console.log(err))
  .then((size) => console.log("Total size = " + size));

// fetchBodySyze("https://developer.mozilla.org/en-US/").then((size) =>
//   console.log("Body zise = " + size),
// );

// asyncFetchBodySyze("https://developer.mozilla.org/en-US/").then((size) =>
//   console.log("Body zise = " + size),
// );
