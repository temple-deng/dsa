/**
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates
 * 中所有可以使数字和为 target 的组合。
 * candidates 中的数字可以无限制重复被选取
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  var res = [];

  // 从 [start, n-1] 中挑选一数，加入到当前组合 c 中
  (function combination(start, target, c) {
    if (target == 0) {
      res.push(c.slice());
      return
    }

    if (target < 0) {
      return
    }

    for (let i = start; i < candidates.length; i++) {
      c.push(candidates[i]);
      combination(i, target-candidates[i], c);
      c.pop();
    }
  })(0, target, [])
  
  return res;
};

console.log(combinationSum([2,3,6,7], 7))