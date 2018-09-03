/**
 * 搜索一个无序集合中的第 k 小的元素，k 从 1 起始
 * @param {Array} arr 数据集合
 * @param {int} k
 * @return {any} 第 k 小的元素
 */
function search(arr, k) {
  if (arr.length < k) {
    throw new Error("Index out of range");
  }

  return this.$search(arr, k, 0, arr.length-1);
}

function $search(arr, k, l, r) {
  if (l >= r) {
    return arr[l];
  }

  const mid = parition(arr, l, r);
  if (mid - l === k-1) {
    return arr[mid];
  } else if (mid - l < k-1) {
    return $search(arr, k-mid-1-l, mid+1, r);
  } else {
    return $search(arr, k, l, mid-1);
  }
}

function partition(arr, l, r) {
  const randomIndex = parseInt(Math.random() * 1000) % (r-l+1) + l;
  swap(arr, l, randomIndex);

  const pivot = arr[l];
  let i = l;
  let j = r+1;

  while( true ) {
    while(i <= r && arr[i] < pivot) {
      i++;
    }
    while(j >= l+1 && arr[j] > pivot) {
      j--;
    }

    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    } else {
      break;
    }
  }
  swap(arr, l, i-1);
  return i-1;
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}