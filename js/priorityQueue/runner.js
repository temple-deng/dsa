const PriorityQueue = require('./priorityQueue');

const queue = new PriorityQueue();

for (let i = 0; i < 20; i++) {
  queue.enqueue(parseInt(Math.random() * 500));
}

const arr = [];
for (let i = 0; i < 20; i++) {
  arr.push(queue.dequeue());
}

console.log(arr);
for (let i = 0; i < 19; i++) {
  if (arr[i] < arr[i+1]) {
    throw new Error("Wrong");
  }
}