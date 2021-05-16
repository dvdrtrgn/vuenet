import Vtree from './modules/Vtree.js';
import BSTree from './modules/BSTree/index.js';
import mocks from './modules/mocks.js';
import output from './modules/output.js';

let mock = new BSTree(mocks.binary);

function justValues(tree) {
  return tree.values;
}

function byRow(tree) {
  return tree.getRows('blanks');
}

function leafLabel(node, note = 'root') {
  if (!node) return;
  if (!node.left && !node.right) {
    return `${node.value} ${note} leaf`;
  }

  return [
    `(${node.value} ${note})`,
    [leafLabel(node.left, 'L'), leafLabel(node.right, 'R')],
  ];
}

output(mock, 'A', justValues);
output(mock, 'B', byRow);
output(mock.root, 'C', leafLabel);

// EXPOSURES

import { bsTools } from './modules/BSTree/index.js';

Object.assign(window, {
  BSTree,
  Vtree,
  mocks,
  concatMids: bsTools.concatMids,
});

// Vtree.setTree(mock);
