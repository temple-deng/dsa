function quickSort(arr) {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  let pivot = arr[length-1];
  let left = [];
  let right = [];
  
  for (let i = 0; i < length - 1; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return quickSort(left).concat(pivot).concat(quickSort(right));
}

const arr1 = [1,2,3,4,5,6,7,8,9]
const arr2 = [9,8,7,6,5,4,3,2,1]
const arr3 = [2,5,7,3,4,8,90,3,5,8,54]