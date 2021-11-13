/**
 * @file 343. 整数拆分
 * @link https://leetcode-cn.com/problems/integer-break/
 */

export function integerBreak2(n: number): number {
    const multi = [0, 1];

    for (let i = 2; i <= n; i++) {
        let max = -1
        for (let j = 1; j < i; j++) {
           max = Math.max(max, multi[i - j] * j, (i - j) * j);
        }
        multi[i] = max;
    }
    return multi[n];
};

function integerBreak(n: number): number {
    // 要求分割 n 的最大成绩
    const multi: number[] = [0, 1];

    itBreak(n, multi);
    return multi[n];
};

function itBreak(n: number, multi: number[]) {
    // 要求分割 n 的最大乘积
    let max = 0;
    for (let i = 1; i <= n - 1; i++) {
        if (!multi[n - i]) {
            itBreak(n - i, multi);
        }
        // 这是个大坑，当我们将 n 分成 n - i 和 i 两部分
        // 其最大乘积等于 n - i * i 的乘积与 i 与分拆 n-i 最大乘积的大者
        max = Math.max(max, (n - i) * i, multi[n - i] * i);
    }

    multi[n] = max;
}