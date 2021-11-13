/**
 * @file 47. 全排列 II
 * @link https://leetcode-cn.com/problems/permutations-ii/
 */

export function permuteUnique(nums: number[]): number[][] {
    if (nums.length === 0) {
        return [];
    }

    if (nums.length === 1) {
        return [nums];
    }

    const map = new Map();
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            continue;
        }
        map.set(nums[i], 1);
        // 这里用了较多的数组操作，可以考虑拆分函数
        const perms = permuteUnique(nums.slice(0, i).concat(nums.slice(i + 1)));
        for (let j = 0; j < perms.length; j++) {
            res.push([nums[i], ...perms[j]]);
        }
    }

    return res;
};