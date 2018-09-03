const AVLTree = require('./avl');
const BST = require('../bst/bst');

const avlTree = new AVLTree();
const bstTree = new BST();

const arr = new Array(1000);

for (let i = 0; i < 1000; i++) {
  arr[i] = parseInt(Math.random() * 5000);
}

console.time("AVL Insert");
for (let i = 0; i < 1000; i++) {
  avlTree.insert(arr[i], arr[i]);
}
console.timeEnd("AVL Insert");

console.time("BST Add");
for (let i = 0; i < 1000; i++) {
  bstTree.add(arr[i]);
}
console.timeEnd("BST Add");

console.log(avlTree.isBalanced());

// console.time("AVL Search");
// for (let i = 0; i < 1000; i++) {
//   avlTree.insert(arr[i], arr[i]);
// }
// console.timeEnd("AVL Insert");

// console.time("BST Add");
// for (let i = 0; i < 1000; i++) {
//   bstTree.add(arr[i]);
// }
// console.timeEnd("BST Add");