/**
 * @file 977. 有序数组的平方
 * @link https://leetcode-cn.com/problems/squares-of-a-sorted-array/
 */

// 基于排序的解法
export function sortedSquares2(nums: number[]): number[] {
    for (let i = 0; i < nums[i]; i++) {
        nums[i] = nums[i] * nums[i];
    }

    return nums.sort((a, b) => a - b);
};

