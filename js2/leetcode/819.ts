function maxSubarraySumCircular(nums: number[]): number {
    const memo: number[] = [nums[0]];

    if (nums.length === 1) {
        return nums[0];
    }

    let sum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        memo[i] = Math.max(memo[i - 1] + nums[i], nums[i]);
        sum += nums[i];
    }

    let max = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        max = Math.max(max, memo[i]);
    }

    const memo2: number[] = [nums[1]];
    let min = memo2[0];
    for (let i = 1; i < nums.length - 1; i++) {
        memo2[i] = Math.min(memo2[i - 1] + nums[i + 1], nums[i + 1]);
        min = Math.min(min, memo2[i]);
    }

    return Math.max(max, sum - min);
};

export {}