function mergeSort(arr) {
  return $mergeSort(arr, 0, arr.length - 1);
}

function $mergeSort(arr, left, right) {
  if (left >= right) {
    return arr;
  }

  const mid = left + (right - left) / 2;
  $mergeSort(arr, left, mid);
  $mergeSort(arr, mid+1, right);
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  
}