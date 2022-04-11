function maxProfit(k: number, prices: number[]): number {
    if (prices.length <= 1) {
        return 0;
    }

    const dp: number[][] = new Array(2);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(2 * k + 1).fill(0);
    }

    for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        for (let j = 1; j < dp[i % 2].length; j++) {
            if (j % 2) {
                // 奇数
                dp[i % 2][j] = Math.max(dp[(i - 1) % 2][j] + diff, dp[(i - 1) % 2][j - 1], j - 2 >= 2 ? dp[(i - 1) % 2][j - 2] + diff : 0);
            } else {
                dp[i % 2][j] = Math.max(dp[(i - 1) % 2][j], dp[(i - 1) % 2][j - 1] + diff);
            }
        }
    }

    let max = 0;
    const n = prices.length - 1;
    for (let i = 0; i < dp[n % 2].length; i++) {
        if (i % 2 === 0) {
            max = Math.max(max, dp[n % 2][i]);
        }
    }

    return max;
};

export {}

// 多少种状态 ？
// k = 1, 3
// k = 2, 5
// 2k + 1 种
// dp[i][0] = 0;
// dp[i][ k 为奇数] 是第 k / 2 + 1 次买入
// dp[i][k 为偶数] 是第 k / 2 次卖出

// dp[i][k为奇数] 有哪些情况呢
// 持有状态 dp[i - 1][k] + diff
// 之前卖出，今天买入 dp[i - 1][k - 1]
// 今天卖出，今天买入 dp[i - 1][k - 2] + diff

// dp[i][k为偶数] 有哪些情况
// 之前就卖出了 dp[i - 1][k]
// 今天卖出 dp[i - 1][k - 1] + diff