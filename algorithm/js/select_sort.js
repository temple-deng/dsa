/**
 * 选择排序，每次找出一个最小的元素放到前面
 * @param {Array} arr 待排序数组
 * @returns {Array} arr 排好序的数组
 */
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (i !== minIndex) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }

  return arr;
}

const arr1 = [1,3,5,8,3,4,0,2,12,43,23,87,54];
console.log(selectSort(arr1));