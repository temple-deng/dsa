/**
 * @file 213. 打家劫舍 II
 * @link https://leetcode-cn.com/problems/house-robber-ii/
 */

export function rob(nums: number[]): number {
    // memo1[i] 代表偷了第 0 户的前 i 套房子的最大金额
    // memo2[i] 代表一定没偷第 0 户的前 i 套房子的最大金额
    // 初始值怎么定,memo1[0] = [nums[0]] 这个是肯定的
    // memo2[0] 呢，应该是 0 吧
    const memo1 = [nums[0]];
    const memo2 = [0];
    const n = nums.length;
    if (nums.length >= 2) {
        memo1.push(Math.max(nums[0], nums[1]));
        memo2.push(nums[1]);
    }

    for (let i = 2; i < n; i++) {
        let max1 = 0;
        let max2 = 0;
        // 考虑抢劫前 i 个房子能获取的最大收益
        // f(i) = max{v(i) + f(i - 2), v(i - 1) + f(i - 3), v(1), v(0)};
        // max = Max(v[j] + memo2[j - 2], memo1[j - 1]);

        // 考虑偷了第 0 户，那就不能包含 nums[i]
        for (let j = i - 1; j >= 0; j--) {
            max1 = Math.max(max1, j >= 2 ? nums[j] + memo1[j - 2] : nums[j]);
        }

        // 考虑一定没偷第 0 户，那就能包含 numbs[i]
        for (let j = i; j >= 1; j--) {
            max2 = Math.max(max2, j >= 2 ? nums[j] + memo2[j - 2] : nums[j]);
        }
        memo1[i] = max1
        memo2[i] = max2;
    }

    return Math.max(memo1[n - 1], memo2[n - 1]);
};