function insertionSort(arr) {
  const length = arr.length
  for (let i = 1; i < length; i++) {
    let elem = arr[i];
    let j = i - 1;
    while (j >= 0 && elem < arr[j]) {
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = elem;
  }
  return arr;
}