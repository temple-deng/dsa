/**
 * @file
 */

export {}

function maxValue(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j] 到 i,j 的最大礼物价值
    // dp[i][j] = dp[i - 1][j] + grid[i][j]
    
    const dp = new Array(m);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(n);
    }
    dp[0][0] = grid[0][0];

    for (let i = 1; i < n; i++) {
        dp[0][i] = dp[0][i - 1] + grid[0][i];
    }

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
};