const LinkedList = require('./linkedList');
const DoublyLinkedList = require('./doublyLinkedList');

const ll = new LinkedList();

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    ll.addFirst(i);
  } else {
    ll.addLast(i);
  }
}

console.log("%s", ll);

ll.removeLast();
console.log("Remove Last: %s", ll);
ll.removeFirst();
console.log("RemoveFirst: %s", ll);
ll.remove(4);
console.log("Remove Index 4: %s", ll);

console.log("-------------------------DoublyLinkedList-------------------");
const dll = new DoublyLinkedList();