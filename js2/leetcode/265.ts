export class Solution {

    /**
     * minCostII
     *
     * @param costs: n x k cost matrix
     * @return: an integer, the minimum cost to paint all houses
     */
    minCostII(costs: number[][]) {
        // write your code here
        if (costs.length === 0) {
            return 0;
        }

        const m = costs.length;
        const n = costs[0].length;

        const dp: number[][] = new Array(m);
        for (let i = 0; i < m; i++) {
            dp[i] = new Array(n);
        }

        dp[0] = costs[0];
        let prevMin = Math.min(...dp[0]);

        // dp[i][j] 表示第 i 栋房子用颜色 j 染色的最小花费
        // dp[i][j] = min{dp[i - 1][0], dp[i-1][1], ...dp[i - 1][j - 1], dp[i - 1][j + 1]...., dp[i - 1][n - 1]}
        for (let i = 1; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let min = Infinity;
                for (let k = 0; k < n; k++) {
                    if (k !== j) {
                        min = Math.min(dp[i - 1][k], min);
                    }
                }

                dp[i][j] = min + costs[i][j];
            }

        }

        return Math.min(...dp[m - 1]);
    }
}