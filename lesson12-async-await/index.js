"use strict";

function fetchBodySize(uri) {
  console.log("Fetching " + uri)
  return fetch(uri)
    .then((resp) => resp.text())
    .then((body) => {
      console.log(" ----> " + uri)
      return body.length;
    });
}
/**
 * ALERT: we are ignoring the error case!
 */
function fetchAndSum(...uris) {
  const promises = []; // Array<Promise<number>>
  for (const uri of uris) {
    const p = fetchBodySize(uri);
    promises.push(p);
  }
  return new Promise((resolve, reject) => {
    let sum = 0; // accumulates the sum of bodies responses length
    let count = 0; // counts received respomses
    for (const p of promises) {
      // accumulate results in sum as responses are received.
      p.then((size) => {
        sum += size;
        count++;
        if(count == promises.length) {
          resolve(sum)
        }
      });
    }
  });
}

/**
 * ALERT: we are ignoring the error case!
 */
async function asyncFetchAndSum(...uris) {
  let sum = 0; // accumulates the sum of bodies responses length
  for (const uri of uris) {
    const p = fetchBodySize(uri); // Promise<number>
    const size = await p; // number
    sum += size;
  }
  return sum;
}

/**
 * ALERT: we are ignoring the error case!
 */
async function asyncFetchAndSumConcurrent(...uris) {
  const promises = []
  for (const uri of uris) {
    const p = fetchBodySize(uri); // Promise<number>
    promises.push(p)
  }
  let sum = 0; // accumulates the sum of bodies responses length
  for (const p of promises) {
    const size = await p;
    sum += size;
  }
  return sum;
}



async function asyncFetchBodySize(uri) {
  const p = fetch(uri); // Promise<Response>
  const resp = await p; // Response
  const body = await resp.text(); // String
  return body.length; // number
}

asyncFetchAndSumConcurrent(
  "https://en.wikipedia.org/",
  "https://github.com/",
  "https://developer.mozilla.org/en-US/",
)
  .catch((err) => console.log(err))
  .then((size) => console.log("Total size = " + size));

// fetchBodySize("https://developer.mozilla.org/en-US/")
//   .catch((err) => console.log(err))
//   .then((size) => console.log("Total size = " + size));

// asyncFetchBodySize("https://developer.mozilla.org/en-US/")
//   .catch((err) => console.log(err))
//   .then((size) => console.log("Total size = " + size));

