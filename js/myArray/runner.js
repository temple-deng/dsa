const Arr = require('./myArray');

const arr = new Arr(12);

// 下面打印数组的时候必须要手动调用 toString() 方法才行，或者使用 %s
console.log("Current Array: %s", arr);   // []
console.log("Current Array is Empty: %s", arr.isEmpty());  // true

arr.insert(0, 1);
arr.insert(1, 3);
arr.insert(1, 2);

console.log("After insert 1, 2, 3: %s", arr);  // [1, 2, 3]

arr.addLast(4);
arr.addFirst(0);

console.log("After insert 4 at end and insert 0 at start: %s", arr);  // [0, 1, 2, 3, 4]

arr.set(2, 100);
const elem = arr.get(2);

console.log("After set element which index is 2 to 100: %s", arr);    // [0, 1, 100, 3, 4]
console.log("Value at index 2: %s", elem);   // 100

console.log("Array contains 50: %s", arr.contains(50));   // false

arr.insert(4, 50);
console.log("Insert 50 at index 4, contains 50: %s", arr.contains(50)); // true

console.log("Current array: %s", arr);  // [0, 1, 100, 3, 50, 4]

arr.removeLast();
arr.removeFirst();
console.log("Remove first and last element: %s", arr);