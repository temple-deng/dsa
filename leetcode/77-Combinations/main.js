/**
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  var res = [];
  if (n === 0 || k === 0 || n < k) {
    return res;
  }

  (function combination(comb, n, k) {
    if (n == 0 || k == 0 || n < k) {
      return;
    }

    if (k === 1) {
      for (let i = 1; i <= n; i++) {
        res.push(comb.concat(i));
      }
      return;
    }

    // 包含 n
    combination(comb.concat(n), n-1, k-1);
    // 不包含 n
    combination(comb, n-1, k);
  })([], n, k)

  return res;
};


function combine2(n, k) {
  var res = [];
  if (n === 0 || k === 0 || n < k) {
    return res;
  }

  (function combination(n, k, start, c) {
    if (c.length === k) {
      res.push(c);
      return;
    }

    for (let i = start; i <= n - (k-c.length) + 1; i++) {
      c.push(i);
      combination(n, k, i+1, c);
      c.pop();
    }
  })(n, k, 1, [])
}

console.log(combine(4, 2));