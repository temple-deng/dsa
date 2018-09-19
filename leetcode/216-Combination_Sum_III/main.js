/**
 * 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数
 * 并且每种组合中不存在重复的数字。
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  var res = [];
  if (k <= 0 || n <= 0) {
    return res;
  }

  // 从 [start, 9] 中找一个数，使其与 c 中的其他数之和等于 sum
  (function combine(start, sum, c) {
    if (sum < 0) {
      return;
    }
    if (sum === 0 && k === c.length) {
      res.push(c.slice());
      return;
    }

    for (let i = start; i <= (10 - (k - c.length)); i++) {
      c.push(i);
      combine(i+1, sum-i, c);
      c.pop();
    }
  })(1, n, [])

  return res;
};

console.log(combinationSum3(3, 7));