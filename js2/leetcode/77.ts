/**
 * @file 77. 组合
 * @link https://leetcode-cn.com/problems/combinations/
 */

export function combine(n: number, k: number): number[][] {
    const res: number[][]= [];

    if (k === 1) {
        for (let i = 1; i <= n; i++) {
            res.push([i]);
        }
        return res;
    }

    for (let i = n; i >= 1; i--) {
        const combines = combine(i - 1, k - 1);
        for (let j = 0; j < combines.length; j++) {
            res.push(combines[j].concat(i));
        }
    }

    return res;
};