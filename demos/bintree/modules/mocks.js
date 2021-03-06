const top10 = [10, [2, 20], [1, 4, 30], [3, 5, 29, 35]].flat();

const top50 = [50, [25, 20, 30, 10, 40], [75, 60, 70, 80, 90]].flat();

const sequenced = [
  8,
  // left
  4,
  [2, 6],
  [1, 3, 5, 7],
  // right
  12,
  [10, 14],
  [9, 11, 13, 15],
].flat();

const binary = [4, [2, 6], [1, 3, 5, 7]].flat();

const solid = [
  [50, 19, 81, 5, 35, 67, 93],
  [2, 13, 25, 44, 61, 75, 90, 98],
  [0, 3, 10, 16, 20, 30, 40, 49, 60, 66, 70, 80, 84, 91, 94, 99],
].flat();

export default {
  binary,
  sequenced,
  solid,
  top10,
  top50,
};
