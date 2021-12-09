/**
 * @file 45. 跳跃游戏 II
 * @link https://leetcode-cn.com/problems/jump-game-ii/
 */

export function jump2(nums: number[]): number {
    // f(i) 代表到达当前位置花费的最小跳跃次数
    // 这个方法耗时有点长啊，那应该是要有剪枝操作？

    const memo = [0];

    for (let i = 1; i < nums.length; i++) {
        let min = Infinity;
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] >= i - j) {
                min = Math.min(min, 1 + memo[j]);
            }
        }

        memo[i] = min;
    }

    return memo[nums.length - 1];
};

