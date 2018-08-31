/**
 * 归并排序，自底向上的方案
 */

function mergeSortBU(arr) {
  $mergeSort(arr, 0, arr.length - 1);
}

function $mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }

  for (let size = 1; size < arr.length; size += size) {
    for (let i = 0; i + size < arr.length; i += size + size) {
      merge(arr, i, i + size -1, Math.min(arr.length - 1, i+ size + size - 1));
    }
  }
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

mergeSortBU(arr);

for (let i = 0; i < 999; i++) {
  if (arr[i] > arr[i+1]) {
    throw new Error("Error");
  }
}

// console.log(arr);