const BST = require('./bst2');

const tree = new BST();

console.log("Current size = %s", tree.GetSize());

tree.Add(5, 5);
tree.Add(2, 2);
tree.Add(7, 7);
tree.Add(-3, -3);
tree.Add(100, 100);
tree.Add(4, 4);
tree.Add(29, 29);

console.log("Contains 0? %s", tree.Contains(0));

console.log("------PreOrder------");
tree.PreOrder();
// 5  2  -3  4  7  100 29

console.log("---------InOrder--------");
tree.InOrder();
// -3  2  4  5  7  29  100

console.log("----------PostOrder------");
tree.PostOrder();
// -3  4  2  29 100  7 5

let max = tree.Maximum();
console.log("Current max should be 100, got %s", max);

let min = tree.Minimum();
console.log("Current min should be -3, got %s", min);

tree.Remove(7);
tree.Remove(100);
tree.Remove(29);

max = tree.Maximum();
console.log("Current max should be 5, got %s", max);

tree.Add(99, 99);
max = tree.Maximum();
console.log("Current max should be 99, got %s", max);

console.log("Current size, should be 5, got %s", tree.GetSize());