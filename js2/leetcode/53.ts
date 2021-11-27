/**
 * @file 53. 最大子序和
 * @link https://leetcode-cn.com/problems/maximum-subarray/
 */

export function maxSubArray(nums: number[]): number {
    const max = [nums[0]];
    const n = nums.length;

    for (let i = 1; i < n; i++) {
        max[i] = Math.max(nums[i], max[i - 1]);
    }

    let m = max[0]
    for (let i = 1; i < n;i++) {
        m = Math.max(m, max[i]);
    }

    return m;
};