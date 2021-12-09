/**
 * @file 213. 打家劫舍 II
 * @link https://leetcode-cn.com/problems/house-robber-ii/
 */

export function rob(nums: number[]): number {
    const res = robFn(nums.slice(0, nums.length - 1));
    const res2 = robFn(nums.slice(1));
    return Math.max(res, res2);
};

function robFn(nums: number[]): number {
    const memo = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 0; i < nums.length; i++) {
        memo[i] = Math.max(memo[i - 1], memo[i - 2] + nums[i]);
    }
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }
    return memo.pop()!;
}