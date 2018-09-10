/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序
 * @param {number[]} nums
 */
function moveZeroes(nums) {
  var n = nums.length;
  var k = 0;
  
  // 我们将整个数组分为三部分
  // [0, k-1] 是非 0 元素
  // [k, i-1] 是 0
  // [i, n-1] 是未探索部分
  for (let i = 0; i < n; i++) {
    if (nums[i]) {
      if (k !== i) {
        nums[k] = nums[i];
        nums[i] = 0;
      }
      k++;
    }
  }
}

/**
 * 第二种解法，先遍历一次数组将非 0 元素都提出来
 * 然后再拷贝到前面，后面补 0
 * @param {*} nums 
 */
function moveZeroes2(nums) {
  var aux = [];
  var n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] !== 0) {
      aux.push(nums[i]);
    }
  }

  var m = aux.length;
  for (let i = 0; i < m; i++) {
    nums[i] = aux[i];
  }

  for (let i = m; i < n; i++) {
    nums[i] = 0;
  }
}