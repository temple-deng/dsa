/**
 * @file 400. 第 N 位数字
 * @link https://leetcode-cn.com/problems/nth-digit/
 */

export function findNthDigit(n: number): number {
    let str = '';
    for (let i = 1; i <= n; i++) {
        str += n;
        if (str.length >= n) {
            return Number(str[n]);
        }
    }
};