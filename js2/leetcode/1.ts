/**
 * @file 1 两数之和
 * @link https://leetcode-cn.com/problems/two-sum/submissions/
 */

function twoSum(nums: number[], target: number): number[] {
    const map = new Map();

    for (let i = 0, len = nums.length; i < len; i++) {
        const n = nums[i];
        if (map.has(target - n)) {
            return [map.get(target - n), i];
        } else {
            map.set(n, i);
        }
    }
    return [];
};