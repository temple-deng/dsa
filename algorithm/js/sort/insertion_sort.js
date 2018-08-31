/**
 * 插入排序，打扑克牌的方式进行插入，复杂度 O(n^2)
 * 但是有序的数据集合的情况下，复杂度会降低到 O(n)
 * 常量额外空间，稳定排序
 * @param {}} arr 
 */
function insertionSort(arr) {
  const length = arr.length
  for (let i = 1; i < length; i++) {
    let elem = arr[i];
    let j = i - 1
    for (; j >= 0 && elem < arr[j]; j--) {
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = elem;
  }
  return arr;
}