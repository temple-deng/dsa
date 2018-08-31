/**
 * 快排，之所以叫 Bad，是因为我们在取基准值时没有随机取
 * 而是一直取数组最左边的元素，这种情况下当数据集合接近有序时，
 * 要退化成 O(n^2)
 * @param {*} arr 
 */
function quickSortBad(arr) {
  quickSort(arr, 0, arr.length - 1);
}

function quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }

  const mid = partition(arr, l, r);
  quickSort(arr, l, mid - 1);
  quickSort(arr, mid + 1, r);
}

/**
 * 分区，arr[l, mid - 1] < arr[mid] <= arr[mid+1, r]
 * @param {array} arr 原数组
 * @param {int} l 分区左边界
 * @param {int} r 分区右边界
 * @return {int} mid
 */
function partition(arr, l, r) {
  // 最基本的情况下，选择最左边的元素做基准值
  const pivot = arr[l];

  let j = l;
  // arr[l+1, j] 是小于 pivot 的元素
  // arr[j+1, r] 是大于 pivot 的元素
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < pivot) {
      swap(arr, j+1, i);
      j++;
    }
  }

  swap(arr, l, j);
  return j;
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

const arr = Array(10);

for (let i = 0; i < 10; i++) {
  arr[i] = parseInt(Math.random() * 10000);
}

console.time("Quick Sort");
quickSortBad(arr);
console.timeEnd("Quick Sort");

for (let i = 0; i < 9; i++) {
  if (arr[i] > arr[i+1]) {
    throw new Error("Error");
  }
}