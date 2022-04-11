export {}

// lintcode 的题
// https://www.lintcode.com/problem/437/

export class Solution {

    /**
     * copyBooks
     *
     * @param pages: an array of integers
     * @param k: An integer
     * @return: an integer
     */

    // 从题目的描述来看，就是如何将这个数组分成 k 份，然后令每个组的和最小的划分方案
    // 划分型的动态规划
    // 寻找最后一个问题
    // 这最后一个问题就不好解
    // 二维数组？
    // f[i][j] 表示前 i 本书由 j 个人抄写的最小最大和
    // f[i][j] = min{k=0-i-1 f[k][j - 1] + sum(k, i)}
    // 这里我们还是预处理一下
    copyBooks(pages, k) {
        // write your code here
        const n = pages.length;
        if (n === 0) {
            return 0;
        }

        if (k >= n) {
            return Math.max(...pages);
        }


        const sum = new Array(n);
        for (let i = 0; i < sum.length; i++) {
            sum[i] = new Array(n);
        }

        for (let i = 0; i < n; i++) {
            sum[i][i] = pages[i];
            for (let j = i + 1; j < n; j++) {
                sum[i][j] = sum[i][j - 1] + pages[j];
            }
        }

        let dp = new Array(n);
        for (let i = 0; i < n; i++) {
            // 这里我们用 k + 1 的大小，因为用 k 真的很难解释
            dp[i] = new Array(k + 1);
        }

        for (let j = 0; j < k + 1; j++) {
            dp[0][j] = pages[0];
        }

        for (let i = 0; i < dp.length; i++) {
            dp[i][1] = sum[0][i];
        }

        // f[i][j] 表示前 i 本书由 j 个人抄写的最小最大和
        // f[i][j] = min{k=0-i-1 f[k][j - 1] + sum(k, i)}
        // 没有这么简单，这个方程不对，最小最大和
        // 这感觉不太对哦，用二维的话，那我们最后的结果是 f[i][j]?
        // 那取极值的地方在哪
        for (let i = 1; i < n; i++) {
            for (let j = 2; j < k + 1; j++) {
                let min = Infinity;

                for (let m = 0; m <= i; m++) {
                    min = Math.min(min, Math.max(m === 0 ? -Infinity : dp[m - 1][j - 1], sum[m][i]));
                }

                dp[i][j] = min;
            }
        }

        return dp[n - 1][k];
    }

}