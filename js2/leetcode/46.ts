/**
 * @file 46. 全排列
 * @link https://leetcode-cn.com/problems/permutations/
 * @description 典型的排列问题
 */

export function permute(nums: number[]): number[][] {
    if (nums.length === 0) {
        return [];
    }

    if (nums.length === 1) {
        return [nums];
    }

    const res = [];
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const subPermute = permute(nums.slice(0, i).concat(nums.slice(i + 1)));
        for (let j = 0; j < subPermute.length; j++) {
            res.push([num, ...subPermute[j]]);
        }
    }

    return res;
};
