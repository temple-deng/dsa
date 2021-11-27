/**
 * @file 746. 使用最小花费爬楼梯
 * @link https://leetcode-cn.com/problems/min-cost-climbing-stairs/
 */

export function minCostClimbingStairs(cost: number[]): number {
    // f(i) 表示爬到第 i 层楼梯花费的最小体力

    const memo: number[] = [cost[0], cost[1]];
    const n = cost.length;

    for (let i = 2; i < cost.length; i++) {
        memo[i] = Math.min(memo[i - 1] + cost[i], memo[i - 2] + cost[i]);
    }

    return Math.min(memo[n - 1], memo[n - 2]);
};

