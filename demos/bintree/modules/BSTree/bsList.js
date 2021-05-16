export default class bsList {
  constructor(root, depth) {
    this.list = []; // Breadth First Traversal

    const queue = [root];

    while (queue.length) {
      const current = queue.shift();
      const blanks = depth && (current.depth < depth);
      let left, right, blank;

      if (blanks) blank = { depth: current.depth + 1 };
      left = current.left || blank;
      right = current.right || blank;

      this.list.push(current);

      if (left) queue.push(left);
      if (right) queue.push(right);
    }
  }

  getRow(num) {
    return this.list.filter((node) => node.depth === num);
  }

  getValues() {
    return this.list.map((node) => node.value);
  }
}
