function mergeSort(arr) {
  return $mergeSort(arr, 0, arr.length - 1);
}

function $mergeSort(arr, left, right) {
  if (left >= right) {
    return;
  }

  const mid = left + Math.floor((right - left) / 2);
  $mergeSort(arr, left, mid);
  $mergeSort(arr, mid+1, right);
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  const temp = Array(right - left + 1);
  let k = 0,
    i = left,
    j = mid + 1;

  while (i <= mid && j <= right) {
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
    i++;
    k++;
  }

  while (j <= right) {
    temp[k] = arr[j];
    j++;
    k++;
  }

  for (let i = 0; i < temp.length; i++) {
    arr[i+left] = temp[i];
  }
}

var arr = [5,7,2,5,65,23,77,34,70,35];
mergeSort(arr);
console.log(arr);
for (let i = 1; i < arr.length; i++) {
  if (arr[i-1] > arr[i]) {
    throw new Error("Error");
  }
}