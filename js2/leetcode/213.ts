/**
 * @file 213. 打家劫舍 II
 * @link https://leetcode-cn.com/problems/house-robber-ii/
 */

export function rob(nums: number[]): number {
    const n = nums.length;
    const memo: number[]= [nums[0]];

    for (let i = 1; i < n; i++) {
        let max = 0;

        // 要么取了当前这一个
        for (let j = i; j >= 1; j++) {
            if (j >= 2) {
                max = Math.max(max, nums[j] + memo[j - 2]);
            } else {
                
            }
        }
    }
};