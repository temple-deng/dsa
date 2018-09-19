/**
 * 自顶向下的带有记忆功能的背包问题解决方案
 * @param {*} w 
 * @param {*} v 
 * @param {*} W 
 */
function knapsack(w, v, W) {
  var n = w.length;
  var arr = Array(n+1);

  for (let i = 0; i <= n; i++) {
    arr[i] = Array(W+1);
  }

  for (let i = 0; i <= n; i++) {
    arr[i][0] = 0;
  }

  for (let i = 0; i <= W; i++) {
    arr[0][i] = 0;
  }

  (function knap(i, j) {
    if (arr[i][j] !== undefined) {
      return arr[i][j];
    }

    if (j - w[i-1] < 0) {
      arr[i][j] = knap(i-1, j);
      return arr[i][j];
    } else {
      arr[i][j] = Math.max(knap(i-1, j), knap(i-1, j - w[i-1]) + v[i-1]);
      return arr[i][j];
    }
  })(n, W);

  console.log(arr);
  return arr[n][W];
}

var w = [2, 1, 3, 2];
var v = [12, 10, 20, 15];

console.log(knapsack(w, v, 5));