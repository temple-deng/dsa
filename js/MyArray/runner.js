const Arr = require('./MyArray');

const arr = new Arr(12);

// 下面打印数组的时候必须要手动调用 toString() 方法才行
console.log(arr.toString());   // []
console.log(arr.isEmpty());  // true

arr.insert(0, 1);
arr.insert(1, 3);
arr.insert(1, 2);

console.log(arr.toString());  // [1, 2, 3]

arr.addLast(4);
arr.addFirst(0);

console.log(arr.toString());  // [0, 1, 2, 3, 4]

arr.set(2, 100);
const elem = arr.get(2);

console.log(elem);    // 100
console.log(arr.toString());   // [0, 1, 100, 3, 4]

console.log(arr.contains(50));   // false

arr.insert(4, 50);
console.log(arr.contains(50)); // true

console.log(arr.toString());  // [0, 1, 100, 3, 50, 4]

arr.removeLast();
arr.removeFirst();
console.log(arr.data);
console.log(arr.toString());  // [1, 100, 3, 50]