function insertionSort(arr) {
  const length = arr.length
  for (let i = 1; i < length; i++) {
    let elem = arr[i];
    let j = i - 1
    for (; j >= 0 && elem < arr[j]; j--) {
      arr[j+1] = arr[j];
    }
    arr[j+1] = elem;
  }
  return arr;
}