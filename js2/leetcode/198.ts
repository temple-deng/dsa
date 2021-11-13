/**
 * @file 198. 打家劫舍
 * @link https://leetcode-cn.com/problems/house-robber/
 */

export function rob(nums: number[]): number {
    // memo[i] 表示考虑抢劫前 i 个房子能获取的最大收益
    // i 从 0 开始考虑
    const memo = [nums[0]];
    const n = nums.length;

    for (let i = 1; i < n; i++) {
        // 考虑抢劫前 i 个房子能获取的最大收益
        // = 从 [0 - i] 这些房子中进行抢劫能获取的最大收益
        let max = 0;
        for (let j = i; j >= 0; j--) {
            max = Math.max(max, j >= 2 ? nums[j] + memo[j - 2] : nums[j]);
        }
        memo[i] = max;
    }

    return memo[n - 1];
};