export {}

function maxProfit(prices: number[]): number {
    if (prices.length <= 1) {
        return 0;
    }

    const dp: number[][] = new Array(prices.length);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(5).fill(0);
    }

    for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        dp[i][1] = Math.max(0, dp[i - 1][1] + diff);
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + diff);
        dp[i][3] = Math.max(dp[i - 1][3] + diff, dp[i - 1][2], dp[i - 1][1] + diff);
        dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + diff);
    }

    const n = prices.length;
    return Math.max(dp[n - 1][0], dp[n - 1][2], dp[n - 1][4]);
};

// 空间优化版
function maxProfit2(prices: number[]): number {
    if (prices.length <= 1) {
        return 0;
    }

    const dp: number[][] = new Array(2);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(5).fill(0);
    }

    for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        dp[i % 2][1] = Math.max(0, dp[(i - 1) % 2][1] + diff);
        dp[i % 2][2] = Math.max(dp[(i - 1) % 2][2], dp[(i - 1) % 2][1] + diff);
        dp[i % 2][3] = Math.max(dp[(i - 1) % 2][3] + diff, dp[(i - 1) % 2][2], dp[(i - 1) % 2][1] + diff);
        dp[i % 2][4] = Math.max(dp[(i - 1) % 2][4], dp[(i - 1) % 2][3] + diff);
    }

    const n = prices.length;
    return Math.max(dp[(n - 1) % 2][0], dp[(n - 1) % 2][2], dp[(n - 1) % 2][4]);
};

// 5 种状态：未买过，第一次买入，第一次卖出，第二次买入，第二次卖出
// 设 dp[i][0 - 4] 为处于对应阶段的最大获利
// 则求的就是 dp[n - 1][0, 2, 4] 的最大值

// 分情况讨论，状态转移方程
// dp[i][0] = 0;
// 今天处于买入状态，可能今天刚买，也可能是之前买了一直持有
// dp[i][1] = Math.max(dp[i - 1][0](今天买入), dp[i - 1][1] + arr[i] - arr[i - 1](今天持有不动))
// 今天处于卖出状态，那可能是之前就卖了，也可能是今天才卖了
// dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + arr[i] - arr[i - 1])
// 今天处于第二次买入状态，可能之前就买了，也可能是今天才买了，还可能是今天卖了又买了
// 这里是一个重大的 bug 点，如果是之前就买了，那是包括之前的持有成本 + 今天的持有成本，不要忘了今天的持有成本
// dp[i][3] = Math.max(dp[i - 1][3] + arr[i] + arr[i - 1], dp[i - 1][2], dp[i - 1][1] + arr[i] - arr[i - 1]);
// 今天处于第二次卖出状态，可能之前就卖了，也可能是今天才卖了
// dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + arr[i] - arr[i - 1]);
// 