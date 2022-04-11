export {}

function findNumberOfLIS(nums: number[]): number {
    // 最后一个问题，以 nums[k] 结尾的子序列是一个递增子序列，
    // 找到所有的长度等于这个 nums[k] 的个数
    // dp[i] 以 nums[i] 结尾的递增子序列，
    // dp[i]  k = [0 ~ i - 1] 任意 nums[k] < nums[i], dp[i] +
    return 1;
};