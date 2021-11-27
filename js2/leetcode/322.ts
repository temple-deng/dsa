/**
 * @file 322. 零钱兑换
 * @link https://leetcode-cn.com/problems/coin-change/
 */

// 自顶向下有点难搞哦
export function coinChange2(coins: number[], amount: number): number {
    // 状态转移方程是什么呢
    // f(i, sum) 是最少使用 i 枚硬币就可以组成指定的 sum 金额
    // 这个取值很麻烦，好像也不是 min，用 min 的话，一个 min 就导致崩了，试试用 Infinity
    // f(i, sum) = 1 + min{coins[i] + f(i-1, sum - coins[i]), ....}
    // memo 的问题，几维？二维 memo[i][j] 表示最少使用 i 个金币弄出金额 amount
    const memo: number[][] = [];
    memo[0] = new Array(amount + 1);
    for (let i = 0; i < amount + 1; i++) {
        memo[0][i] = Infinity;
    }
    coins.sort((a, b) => b - a);
    const min = findChange(coins, amount, 1, memo);
    return min === Infinity ? -1 : min - 1;
};

// 这个递归和别的还有点不同，别的都是从多到少，这个好像是从少到多
function findChange(coins: number[], amount: number, count: number, memo: number[][]): number {
    if (amount < 0) {
        return Infinity;
    }
    if (memo[count] === undefined) {
        memo[count] = new Array(amount + 1);
    }
    if (memo[count][amount]) {
        return memo[count][amount];
    }
    if (amount === 0) {
        memo[count][amount] = count;
        return count;
    }

    let min: number = Infinity;
    for (let i = 0; i < coins.length; i++) {
        const c = coins[i];
        if (amount - c >= 0) {
            min = Math.min(min, findChange(coins, amount - c, count + 1, memo));
        }
        if (min !== Infinity) {
            break;
        }
    }

    memo[count][amount] = min;
    return min;
}

function coinChange(coins: number[], amount: number): number {
    // 试一下自底向上
    const memo: number[][] = [];
    memo[0] = new Array(amount + 1);
    for (let i = 0; i < amount + 1; i++) {
        memo[0][i] = Infinity;
    }

    // memo[j][i] 表示最少能用 j 枚硬币组成当前的金额 i
    for (let i = 1; i < amount + 1; i++) {
        for (let j = 1; j < coins.length; j++) {

        }
    }
};