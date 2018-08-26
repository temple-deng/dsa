const ArrayQueue = require("./arrayQueue");
const LinkedListQueue = require("./linkedListQueue");

const arrayQueue = new ArrayQueue();

console.log("-------------------------ArrayQueue---------------------");
arrayQueue.enqueue(10);
arrayQueue.enqueue(20);
arrayQueue.enqueue(30);
console.log("Enqueue 10, 20, 30: %s", arrayQueue);

console.log("Current head element is: %s", arrayQueue.getFront());

arrayQueue.enqueue(40);
arrayQueue.enqueue(50);
arrayQueue.enqueue(70)
console.log("Enqueue 40 50 70: %s", arrayQueue);

arrayQueue.dequeue();
arrayQueue.dequeue();
console.log("After dequeue 2 elems, current queue: %s", arrayQueue);

console.log("---------------------------LinkedListQueue--------------");
const llQueue = new LinkedListQueue();
llQueue.enqueue("H");
llQueue.enqueue("e");
llQueue.enqueue("l");
llQueue.enqueue("l");
llQueue.enqueue("o");

console.log(llQueue.toString());
console.log("Current queue size: %s", llQueue.getSize());
console.log("Current front element: %s", llQueue.getFront());

for (let i = 0; i < 5; i++) {
  console.log(llQueue.dequeue());
}

console.log("Current queue size: %s", llQueue.getSize());