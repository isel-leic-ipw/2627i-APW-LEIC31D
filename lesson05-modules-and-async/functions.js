export function filter(arr, predicate) {
  const res = [];
  for (const element of arr) {
    if (predicate(element)) res.push(element);
  }
  return res;
}

export function map(arr, transformation) {
  const res = [];
  for (const element of arr) {
    res.push(transformation(element));
  }
  return res;
}

/**
 * This is just a useless function just to show a function
 * that is not exported and will be not available.
 */
function bar() {

}