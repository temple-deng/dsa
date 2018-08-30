/**
 * 一种比较简单的快排，并非标准的快排，因为要用到额外的空间
 * 但标准的快排在 partition 时不需要额外的辅助空间
 * @param {*} arr 
 */
function quickSortBad(arr) {
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


/**
 * 标准快排
 * @param {array} arr 
 */
function quickSort(arr) {
  $quickSort(arr, 0, arr.length - 1);
}

function $quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }

  mid = partition(arr, l, r);
  $quickSort(arr, l, mid-1);
  $quickSort(arr, mid+1, r);
}

/**
 * 分区，arr[l, mid - 1] < arr[mid] <= arr[mid+1, r]
 * @param {array} arr 原数组
 * @param {int} l 分区左边界
 * @param {int} r 分区右边界
 * @return {int} mid
 */
function partition(arr, l, r) {
  // 最基本的情况下，选择最左边的元素做基准值
  const pivot = arr[l];

  let j = l;
  // arr[l+1, j] 是小于 pivot 的元素
  // arr[j+1, r] 是大于 pivot 的元素
  for(let i = l+1; i <= r; i++) {
    if (arr[i] < pivot) {
      swap(arr, j+1, i);
      j++;
    }
  }
  swap(arr, l, j);
  return j;
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}


function partition1(arr, l, r) {
  // 优化方案一，随机取基准值
  swap(arr, l, Math.random() * 1000 % (r-l+1) + l);
  const pivot = arr[l];
  let j = l;

  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < pivot) {
      swap(arr, j + 1, i);
      j++;
    }
  }
  swap(arr, l, j);
  return j;
}

// 优化方案二，将与基准值相等的值，随机分散在两边
function partition2(arr, l, r) {
  swap(arr, l, Math.random() * 1000 % (r - l + 1) + l);
  const pivot = arr[l];
  let i = l + 1;
  let j = r;

  while(i < j) {
    if (arr[i] <= pivot) {
      i++;
    } else if(arr[j] >= pivot) {
      j++;
    } else {
      swap(arr, i, j);
      i++;
      j++;
    }
  }
  swap(arr, l, j);
  return j;
}


var arr = [9,8,7,6,5,4,3,2,1];
quickSort(arr);
console.log(arr);

  // 第一种优化方案，选择一个随机值
  // swap(l, Math.rand() % (r-l+1) + l)