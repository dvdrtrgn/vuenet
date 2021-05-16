const M = Math;
const isOdd = (num) => Boolean(num % 2);
const isEven = (num) => !isOdd(num);
const odds = (arr) => arr.filter((e, i) => isOdd(i));
const evens = (arr) => arr.filter((e, i) => isEven(i));
const logDepth = (length) => M.ceil(M.log(length + 1) / M.LN2);

function pruneThese(arr1, arr2) {
  return arr1.filter((x) => !arr2.includes(x));
}

function hoistMiddle(arr) {
  arr = arr.slice(); // cut reference

  const ln = arr.length;
  const nu = arr.splice((ln * 0.25) | 0, (ln * 0.5) | 0);

  arr.unshift(...nu);

  return arr;
}

function concatMids(arr) {
  let mids = arr.slice();
  let temp = arr.slice();

  while (true) {
    temp = evens(temp.slice(1, -1));
    if (!temp.length) break;

    mids = pruneThese(mids, temp);
    mids.unshift(...temp);
  }

  return mids;
}

export default {
  concatMids,
  hoistMiddle,
  pruneThese,
};
