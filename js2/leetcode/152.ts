/**
 * @file 
 */

export {}

function maxProduct(nums: number[]): number {
    const maxMemo: number[] = [nums[0]];
    const minMemo: number[] = [nums[0]];

    for (let i = 1; i< nums.length; i++) {
        maxMemo[i] = Math.max(maxMemo[i - 1] * nums[i], nums[i], minMemo[i] * nums[i]);
        minMemo[i] = Math.min(maxMemo[i - 1] * nums[i], nums[i], minMemo[i] * nums[i]);
    }

    return Math.max(...maxMemo);
};