/**
 * @file 322. 零钱兑换
 * @link https://leetcode-cn.com/problems/coin-change/
 */

export {}

let memo: number[] = [];

// 自顶向下有点难搞哦
// 艹，竟然对了
export function coinChange(coins: number[], amount: number): number {
    coins.sort((a, b) => a - b);

    const res = findChange(coins, amount);
    memo = [];
    return res;
};

// 在 coins 中找 amount 需要最少几枚硬币
function findChange(coins: number[], amount: number): number {
    if (amount < 0) {
        return -1;
    }
    if (amount === 0) {
        return 0;
    }

    if (memo[amount]) {
        return memo[amount];
    }

    // 基础 case
    let min = Infinity;
    for (let i = 0; i < coins.length; i++) {
        let ret = findChange(coins, amount - coins[i]);
        if (ret !== -1) {
            min = Math.min(min, ret);
        }
    }
    
    if (min === Infinity) {
        memo[amount] = -1;
        return -1;
    }
    memo[amount] = min + 1;
    return min + 1;
}


export function coinChange2(coins: number[], amount: number): number {
    coins.sort((a, b) => a - b);
    // 基础case
    if (amount < 0) {
        return -1;
    }
    if (amount === 0) {
        return 0;
    }
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    // [1, 2, 5] 11
    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (i >= coins[i]) {
                dp[i] = Math.min(dp[i],  dp[i - coins[i]] + 1);
            }
        }
    }

    if (dp[amount + 1] === Infinity) {
        return -1;
    }
    return dp[amount + 1];
}