import 'https://unpkg.com/vue@2';

import BSTree from './BSTree/index.js';
import mocks from './mocks.js';

const name = 'Vtree';
// const template = /*html*/ ``;

export default new Vue({
  name,
  // template,
  el: '#' + name,
  data() {
    return {
      mocks: Object.keys(mocks),
      display_style: 'wide',
      styles: ['fixed', 'wide'],
      mock_choice: 'binary',
      tree: null,
      mock: null,
      value: 0,
    };
  },
  mounted() {
    this.chooseTree();
  },
  methods: {
    insert() {
      this.tree.insert(this.value);
    },
    addRando() {
      this.tree.insert((Math.random() * 100) | 0);
    },
    setTree(tree) {
      this.tree = tree;
    },
    getTree() {
      return this.tree;
    },
    balanceTree() {
      const tree = new BSTree(Vtree.tree.balance());
      this.setTree(tree);
    },
    chooseTree() {
      const mock = new BSTree(mocks[this.mock_choice]);
      this.setTree(mock);
    },
  },
  computed: {
    table() {
      if (!this.tree) return;
      return this.tree.getRows('blanks');
    },
  },
});
