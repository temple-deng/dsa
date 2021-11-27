/**
 * @file 300. 最长递增子序列
 * @link https://leetcode-cn.com/problems/longest-increasing-subsequence/
 */

export function lengthOfLIS(nums: number[]): number {
    const n = nums.length;
    const lis = new Array(n);
    for (let i = 0; i < n; i++) {
        lis[i] = 1;
    }

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                lis[i] = Math.max(lis[i], 1 + lis[j]);
            }
        }
    }

    return lis[n - 1];
};