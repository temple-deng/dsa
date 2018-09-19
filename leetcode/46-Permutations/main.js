/**
 * 给定一个没有重复数字的序列，返回其所有可能的全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let result = [];
  if (nums.length == 0) {
    return result;
  }

  (function per(usedNums) {
    let unusedNums = nums.filter(value => {
      return usedNums.indexOf(value) === -1;
    });

    let len = unusedNums.length;
    if (len === 1) {
      result.push(usedNums.concat(unusedNums[0]));
      return
    }

    for (let i = 0; i < len; i++) {
      per(usedNums.concat(unusedNums[i]));
    }
  })([])

  return result;
};

function permute2(nums) {
  var result = [];
  if (nums.length == 0) {
    return result;
  }

  let used = [];
  for (let i = 0; i < nums.length; i++) {
    used.push(false);
  }

  (function permutations(c) {
    if (c.length === nums.length) {
      result.push(c.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        c.push(nums[i]);
        used[i] = true;
        permutations(c);
        used[i] = false;
        c.pop();
      }
    }
  })([])

  return result;
}

var arr = [1,2,3,4];

console.log(permute(arr));