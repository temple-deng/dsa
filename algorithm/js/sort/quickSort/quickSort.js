function quickSort(arr) {
  $quickSort(arr, 0, arr.length-1);
}

function $quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }

  const mid = partition(arr, l, r);
  $quickSort(arr, l, mid-1);
  $quickSort(arr, mid+1, r);
}

function partition(arr, l, r) {
  swap(arr, l, parseInt(Math.random() * 10000 % (r - l + 1)) + l);
  const pivot = arr[l];

  let lo = l + 1,
    hi = r;
  
  while(lo <= hi) {
    if (arr[lo] < pivot) {
      lo++;
    } else if (arr[hi] > pivot) {
      hi--;
    } else {
      swap(arr, lo, hi);
      lo++;
      hi--;
    }
  }

  swap(arr, l, lo - 1);
  return lo - 1;
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
quickSort(arr);
console.timeEnd("Quick Sort");

for (let i = 0; i < 9; i++) {
  if (arr[i] > arr[i+1]) {
    throw new Error("Error");
  }
}