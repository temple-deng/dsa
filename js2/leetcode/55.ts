/**
 * @file 55. 跳跃游戏
 * @link https://leetcode-cn.com/problems/jump-game/
 */

export function canJump(nums: number[]): boolean {
    const memo = [nums[0]];
    const n = nums.length;

    for (let i = 1; i < n; i++) {
        if (memo[i - 1] < i) {
            return false;
        }
        memo[i] = Math.max(memo[i - 1], nums[i] + i);
        if (memo[i] >= n - 1) {
            return true;
        }
    }

    return true;
};