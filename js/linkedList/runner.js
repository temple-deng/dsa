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

dll.insert(0, 1);
dll.insert(0, 2);
dll.insert(0, 3);

console.log("Insert 1, 2, 3 at index 0, current size = %s, current list: %s", dll.getSize(), dll);

for (let i = 0; i < 3; i++) {
  console.log("%s", dll.remove(0));
}

console.log("After remove all elements, current size = %s, current list: %s", dll.getSize(), dll);