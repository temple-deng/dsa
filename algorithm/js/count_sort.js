function countSort(arr, max) {
  const counts = Array(max+1);
  const temp = Array(arr.length);

  // js 的弊端，必须手动将数组初始化为 0，而且这个对性能的影响还是挺严重的
  for (let i = 0; i < counts.length; i++) {
    counts[i] = 0;
  }

  // 计数
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    counts[val]++;
  }

  // 计数累加，推算索引
  for (let i = 1; i < counts.length; i++) {
    counts[i] = counts[i-1] + counts[i];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const val = arr[i];
    // 实际位置为偏移 - 1
    const index = counts[val] - 1;
    temp[index] = val;
    counts[val]--;
  }

  return temp;
}

var arr = [5, 0, 3, 24, 54,32, 33, 59, 24, 25, 12, 6, 4];
console.log("Array length %d", arr.length);
const sortedArr = countSort(arr, 59);
console.log(sortedArr);

console.log("Sorted array length %d", sortedArr.length);