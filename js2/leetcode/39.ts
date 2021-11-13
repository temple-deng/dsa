/**
 * @file 39. 组合总和
 * @link https://leetcode-cn.com/problems/combination-sum/
 */

export function combinationSum(candidates: number[], target: number): number[][] {
    // 每次挑一个数，然后在整个组合中找 target - num 的组合

    if (candidates.length === 0 || target <= 0) {
        return [];
    }

    const res: number[][] = [];
    combineSum(candidates, 0, target, [], res);
    return res;
};

function combineSum(candidates: number[], start: number, target: number, currCom: number[], res: number[][]): void {
    if (target === 0) {
        // 找到一个解，在 res 中推入
        res.push(currCom);
        return;
    }

    for (let i = start; i < candidates.length; i++) {
        const n = candidates[i];
        const last = target - n;
        if (last >= 0) {
            currCom.push(n);
            combineSum(candidates, i, last, currCom.slice(), res);
            currCom.pop();
        }
    }
}
