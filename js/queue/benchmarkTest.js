const ArrayQueue = require("./arrayQueue");
const LinkedListQueue = require("./linkedListQueue");
const LoopQueue = require("./loopQueue");

const arrQueue = new ArrayQueue(100000);
const llQueue = new LinkedListQueue();
const lpQueue = new LoopQueue(100000);

// 从测试结果来看，链表队列性能还是最好的，循环队列稍差，数组队列则差的无法容忍

console.time("100,000 times enqueue and dequeue ops use ArrayQueue");
for (let i = 0; i < 100000; i++) {
  arrQueue.enqueue(i);
}

for (let i = 0; i < 100000; i++) {
  arrQueue.dequeue();
}

console.timeEnd("100,000 times enqueue and dequeue ops use ArrayQueue");

console.time("100,000 times enqueue and dequeue ops use LinkedListQueue");
for (let i = 0; i < 100000; i++) {
  llQueue.enqueue(i);
}

for (let i = 0; i < 100000; i++) {
  llQueue.dequeue();
}

console.timeEnd("100,000 times enqueue and dequeue ops use LinkedListQueue");

console.time("100,000 times enqueue and dequeue ops use LoopQueue");
for (let i = 0; i < 100000; i++) {
  lpQueue.enqueue(i);
}

for (let i = 0; i < 100000; i++) {
  lpQueue.dequeue();
}

console.timeEnd("100,000 times enqueue and dequeue ops use LoopQueue");