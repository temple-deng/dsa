/**
 * @file 78. 子集
 * @link https://leetcode-cn.com/problems/subsets/
 */

export function subsets(nums: number[]): number[][] {
    const res: number[][] = [];
    subsetsR(nums, 0, res)
    return res;
};


function subsetsR(nums: number[], start: number, res: number[][]): number[][] {
    const ret = [];
    if (start === nums.length) {
        ret.push([]);
        res.push(...ret);
        return ret;
    } else {
        ret.push([nums[start]]);
    }

    const subs = subsetsR(nums, start + 1, res);
    for (let i = 0; i < subs.length; i++) {
        ret.push([nums[start], ...subs[i]]);
    }
    console.log(ret);
    res.push(...ret);
    return ret;
}


