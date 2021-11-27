/**
 * @file 509. 斐波那契数
 * @link https://leetcode-cn.com/problems/fibonacci-number/
 */

export function fib(n: number): number {
    const memo = [0, 1];
    if (n <= 1) {
        return memo[n];
    }
    return fibMemo(n, memo);
};

function fibMemo(n: number, memo: number[]): number {
    if (memo[n] !== undefined) {
        return memo[n];
    }

    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}
