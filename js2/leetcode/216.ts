/**
 * @file 216. 组合总和 III
 * @link https://leetcode-cn.com/problems/combination-sum-iii/
 */

export function combinationSum3(k: number, n: number): number[][] {
    if (n <= 0) {
        return [];
    }

    const res: number[][] = [];
    combine(1, n, k, [], res);
    return res;
};

function combine(start: number, n: number, k: number, curr: number[], res: number[][]) {
    if (n === 0 && k === 0) {
        res.push(curr.slice());
        return;
    }

    for (let i = start; i <= 9 - k + 1; i++) {
        const newN = n - i;
        if (newN < 0) {
            continue;
        }
        curr.push(i);
        combine(i + 1, newN, k - 1, curr, res);
        curr.pop();
    }
}