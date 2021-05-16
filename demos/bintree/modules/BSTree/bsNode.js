function getDepth(current) {
  let d = -1;

  while (current) {
    d += 1;
    current = current.parent() || null;
  }

  return d;
}

export default class bsNode {
  constructor(value) {
    this.value = value;
    this.depth = 0;
    this.parent = () => null;
    this.left = undefined;
    this.right = undefined;
  }

  init(parent) {
    this.parent = () => parent;
    this.depth = getDepth(this);

    return this;
  }
}
