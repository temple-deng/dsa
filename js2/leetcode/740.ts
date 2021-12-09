function deleteAndEarn(nums: number[]): number {
    let max = 0;
    for (const val of nums) {
        max = Math.max(max, val);
    }

    const sum = new Array(max + 1).fill(0);
    for (const val of nums) {
        sum[val] += val;
    }
    const memo = [sum[0], Math.max(sum[0], sum[1])];
    if (sum.length < 2) {
        return sum[0];
    }

    for (let i = 2; i < sum.length; i++) {
        memo[i] = Math.max(memo[i - 1], memo[i - 2] + sum[i]);
    }

    return memo.pop();
};