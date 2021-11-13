/**
 * @file 70. 爬楼梯
 * @link https://leetcode-cn.com/problems/climbing-stairs/
 */

export function climbStairs2(n: number): number {
    const res: number[] = [];
    res[1] = 1;
    res[2] = 2;

    for (let i = 3; i <= n; i++) {
        // 可以选择从 i - 1 层走一步，也可以选择从 i - 2 层走 2 步
        res[i] = res[i - 1] + res[i - 2];
    }

    return res[n];
};