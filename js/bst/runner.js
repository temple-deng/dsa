const BST = require('./bst');

const tree = new BST();

console.log("Current size = %s", tree.getSize());

tree.add(5);
tree.add(2);
tree.add(7);
tree.add(-3);
tree.add(100);
tree.add(4);
tree.add(29);

console.log("Contains 0? %s", tree.contains(0));

console.log("------PreOrder------");
tree.preOrder();
// 5  2  -3  4  7  100 29

console.log("---------InOrder--------");
tree.inOrder();
// -3  2  4  5  7  29  100

console.log("----------PostOrder------");
tree.postOrder();
// -3  4  2  29 100  7 5

let max = tree.maximum();
console.log("Current max should be 100, got %s", max);

let min = tree.minimum();
console.log("Current min should be -3, got %s", min);

tree.remove(7);
tree.remove(100);
tree.remove(29);

max = tree.maximum();
console.log("Current max should be 5, got %s", max);

tree.add(99);
max = tree.maximum();
console.log("Current max should be 99, got %s", max);

console.log("Current size, should be 5, got %s", tree.getSize());