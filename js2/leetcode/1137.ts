/**
 * @file 1137. 第 N 个泰波那契数
 * @link https://leetcode-cn.com/problems/n-th-tribonacci-number/
 */

export function tribonacci(n: number): number {
    const memo = [0, 1, 1];
    if (n <= 2) {
        return memo[n];
    }

    return triMemo(n, memo);
};

function triMemo(n: number, memo: number[]): number {
    if (memo[n] !== undefined) {
        return memo[n];
    }

    memo[n] = triMemo(n - 3, memo) + triMemo(n - 2, memo) + triMemo(n - 1, memo);
    return memo[n];
}