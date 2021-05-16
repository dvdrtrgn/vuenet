import bsNode from './bsNode.js';
import bsList from './bsList.js';
import bsTools from './bsTools.js';

// TODO
// make so tree can recieve root after...like curry
//

class BSTree {
  constructor(value) {
    if (value != null) this.insert(value);
  }

  get depth() {
    return this.getRows().length;
  }

  get values() {
    return this.collect().getValues();
  }

  ensureRoot(value) {
    if (value == null) throw 'must have a value!';
    if (!this.root) {
      this.root = new bsNode(value);
      this.root.tree = () => this;
      return false;
    }
    return true;
  }

  insert(value) {
    if (Array.isArray(value)) {
      return value.forEach(this.insert.bind(this));
    }
    if (!this.ensureRoot(value)) return;

    let newNode = new bsNode(value);
    let current = this.root;

    while (current) {
      if (value === current.value) {
        console.warn(value, 'already there');
        return this;
      }
      if (value < current.value) {
        if (current.left === undefined) {
          current.left = newNode.init(current);
          return this;
        }
        current = current.left;
      } else {
        if (current.right === undefined) {
          current.right = newNode.init(current);
          return this;
        }
        current = current.right;
      }
    }
  }

  getRows(force) {
    let arr = [];
    let i = 0;
    let depth = force === 'blanks' ? this.depth - 1 : 0;
    let list = new bsList(this.root, depth);

    while (1) {
      let row = list.getRow(i++);
      if (!row.length) break;
      arr.push(row.map((node) => node.value));
    }

    return arr;
  }

  collect() {
    return new bsList(this.root);
  }

  balance() {
    return bsTools.concatMids(this.inOrder());
  }

  // TRAVERSALS

  preOrder(result = []) {
    function traverse(node) {
      result.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return result;
  }

  inOrder(result = []) {
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.value);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return result;
  }

  postOrder(result = []) {
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.value);
    }

    traverse(this.root);

    return result;
  }
}

export default BSTree;
export { bsNode, bsList, bsTools };
