/**
 * @file 40. 组合总和 II
 * @link https://leetcode-cn.com/problems/combination-sum-ii/
 */

// 不对。。。
export function combinationSum2(candidates: number[], target: number): number[][] {
    if (candidates.length === 0) {
        return [];
    }

    const res: number[][] = [];
    const set = new Set();
    for (let i = 0; i < candidates.length; i++) {
        if (set.has(candidates[i])) {
            continue;
        }
        set.add(candidates[i]);
        combineSum(candidates, i, target, [], res, new Set());
    }
    return res;
};


function combineSum(candidates: number[], start: number, target: number, curr: number[], res: number[][], innerSet: Set<number>): void {
    // 这里有两个需要去重的地方要注意
    console.log('combine param', 'start', start, 'target', target, 'curr', curr.slice(), 'innerSet', innerSet);
    if (target === 0) {
        res.push(curr.slice());
        return;
    }

    for (let i = start; i < candidates.length; i++) {
        const n = candidates[i];
        const last = target - n;
        // 当前这个数用过
        if (last < 0 || innerSet.has(n)) {
            continue;
        }
        curr.push(n);
        innerSet.add(n);
        combineSum(candidates, i, last, curr, res, innerSet);
        curr.pop();
        innerSet.delete(n);
    }
}