/**
 * 背包问题，自底向上的求解方案
 * @param {array<number>} w 物品的重量数组
 * @param {array<number>} v 物品的价值数组
 * @param {number} W 背包承重
 * @returns {number} 最大价值
 */
function knapsack(w, v, W) {
  const n = w.length;
  var arr = Array(n+1);

  // 建立一个 n+1 * W+1 的矩阵
  for (let i = 0; i <= n; i++) {
    arr[i] = Array(W + 1);
  }

  for (let i = 0; i <= W; i++) {
    arr[0][i] = 0;
  }

  for (let i = 0; i <= n; i++) {
    arr[i][0] = 0;
  }

  for (let j = 1; j <= W; j++) {
    for (let i = 1; i <= n; i++) {
      if (j - w[i-1] < 0) {
        arr[i][j] = arr[i-1][j];
      } else {
        arr[i][j] = Math.max(arr[i-1][j], arr[i-1][j-w[i-1]] + v[i-1]);
      }
    }
  }
  return arr[n][W];
}

var w = [2, 1, 3, 2];
var v = [12, 10, 20, 15];

console.log(knapsack(w, v, 5));