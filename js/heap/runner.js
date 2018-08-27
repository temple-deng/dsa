const MaxHeap = require('./heap');

let heap = new MaxHeap();

heap.add(10);
heap.add(5);
heap.add(100);
heap.add(50);
heap.add(30);

let size = heap.getSize();

console.log("Current heap size, expected 5, got %d", size);

let max = heap.findMax();

console.log("Current max value, expected 100, got %d", max);

heap.replace(40);
max = heap.findMax();

console.log("Current max value, expected 50, got %d", max);

heap.removeMax();
max = heap.findMax();

console.log("Current max value, expected 40, got %d", max);

let arr = [1, 3, 2, 5, 76, 43, 74,23, 7, 0];

heap = new MaxHeap(arr);

console.log("Current size, expected %d, got %d", arr.length, heap.getSize());

max = heap.findMax();

console.log("Current max value, expected 76, got %d", max);

max = heap.removeMax()

console.log("Removed max value, expected 76, got %d", max);

heap.replace(99)
max = heap.findMax()

console.log("Current max value, expected 99, got %d", max);