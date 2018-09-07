/**
 * 硬币问题，使用最少的硬币数支付给定的金额
 * 假设这里的硬币面值分别为 1, 5, 10, 50, 100, 500
 * @param {int} sum 要支付的金额
 * @param {Array<int>} countArr 各个面值硬币的数量的数组，按照上面的面值顺序排列
 * @return {int} count 最少使用的硬币树，假设本提必有一种满足解答的方案
 */
function coin(sum, countArr) {
  const value = [1, 5, 10, 50, 100, 500];
  const used = Array(6);
  let count = 0;

  for (let i = 5; i >= 0; i--) {
    // 可用的 value[i] 面值的硬币的数量
    const t = Math.min(countArr[i], Math.floor(sum / value[i]));
    sum = sum - (value[i] * t);
    used[i] = t;
    count += t;
  }

  return {
    used,
    count
  };
}

const sum = 620;
const countArr = [3, 2, 1, 3, 0, 2];
console.log(coin(sum, countArr));