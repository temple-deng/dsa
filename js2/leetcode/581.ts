/**
 * 
 */

export {}

function findUnsortedSubarray(nums: number[]): number {
    const sorted = Array.from(nums).sort((a, b) => a - b);

    let l = 0;
    let r = nums.length - 1;

    while (l <= r && sorted[l] === nums[l]) {
        l++;
    }

    while (l <= r && sorted[r] === nums[r]) {
        r--;
    }

    return r - l + 1;
};
