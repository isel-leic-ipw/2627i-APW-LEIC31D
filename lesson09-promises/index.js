function fetchAndSum(...urls) {
  const bodies = urls
    .map((a) => {
      console.log(a);
      return fetch(a);
    })
    .map((p) => p.then((resp) => resp.text()));
  let prev = bodies[0].then((b) => b.length);
  for (let i = 1; i < bodies.length; i++) {
    const curr = bodies[i];
    prev = prev.then((size) => curr.then((body) => size + body.length));
  }
  return prev;
}

function fetchAndSum2(...urls) {
  const bodies = urls
    .map((a) => {
      console.log(a);
      return fetch(a);
    })
    .map((p) => p.then((resp) => resp.text()));
  return Promise.all(bodies).then((arr) => {
    return arr.reduce((prev, curr) => prev + curr.length, 0)
  });
}

fetchAndSum(
  "https://en.wikipedia.org/",
  "https://github.com/",
  "https://developer.mozilla.org/en-US/",
)
  .catch((err) => console.log(err))
  .then((size) => console.log("Total size = " + size));

fetchAndSum2(
  "https://en.wikipedia.org/",
  "https://github.com/",
  "https://developer.mozilla.org/en-US/",
)
  .catch((err) => console.log(err))
  .then((size) => console.log("Total size = " + size));
