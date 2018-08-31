/**
 * 归并排序，自顶向下的方案
 * @param {*} arr 
 */
function mergeSort(arr) {
  $mergeSort(arr, 0, arr.length-1);
}

function $mergeSort(arr, l, r) {
  // 这里是一个可以进行优化的点
  // 例如在已经递归到一个比较小的情况下，采用插入排序
  if (l >=r) {
    return;
  }

  // if (r - l < 15) {
  //   insertionSort(arr, l, r);
  // }

  const mid = l + Math.floor((r - l) / 2);
  $mergeSort(arr, l, mid);
  $mergeSort(arr, mid+1, r);
  merge(arr, l, mid, r);
}

function merge(arr, l, mid, r) {
  const temp = Array(r - l + 1);
  let k = 0,
    i = l,
    j = mid + 1;

  while(i <= mid && j <= r) {
    if (arr[i] < arr[j]) {
      temp[k] = arr[i];
      i++;
    } else {
      temp[k] = arr[j];
      j++;
    }
    k++;
  }

  while(i <= mid) {
    temp[k] = arr[i];
    k++;
    i++;
  }

  while(j <= r) {
    temp[k] = arr[j];
    k++;
    j++;
  }

  for (let i = 0; i < temp.length; i++) {
    arr[l+i] = temp[i];
  }
}


const arr = Array(1000);

for (let i = 0; i < 1000; i++) {
  arr[i] = parseInt(Math.random() * 10000);
}

mergeSort(arr);

for (let i = 0; i < 999; i++) {
  if (arr[i] > arr[i+1]) {
    throw new Error("Error");
  }
}

console.log(arr);

