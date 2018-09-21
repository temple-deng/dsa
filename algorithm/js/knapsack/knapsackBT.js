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


/**
 * 背包问题的一种空间优化方案
 * 考虑背包问题的递归方程
 * F(i, c) = max(F(i-1, c), vi + F(i-1, c-wi))
 * 第 i 行的元素只依赖于第 i-1 行的元素，理论上，只需要保存两行元素
 * 空间复杂度 O(2 * C) = O(C)
 * @param {*} w 
 * @param {*} v 
 * @param {*} C 
 */
function knapsackOpt(w, v, C) {
  const n = w.length;
  var arr = Array(2);
  arr[0] = Array(C+1);
  arr[1] = Array(C+1);

  for (let i = 0; i <= C; i++) {
    arr[0][i] = 0;
  }
  arr[1][0] = 0;

  for (let i = 1; i <= n; i++) {
    let index = i % 2;
    for (let j = 1; j <= C; j++) {
      if ( j - w[i-1] < 0) {
        arr[index][j] = arr[(i+1) % 2][j];
      } else {
        arr[index][j] = Math.max(arr[(i+1) % 2][j],
          v[i-1] + arr[(i+1) % 2][j - w[i-1]]); 
      }
    }
  }

  return n % 2 === 1 ? arr[1][C] : arr[0][C];
}

var w = [2, 1, 3, 2];
var v = [12, 10, 20, 15];

console.log(knapsackOpt(w, v, 5));