/**
 * 
 */

export {}

function findMin(nums: number[]): number {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
        const mid = Math.floor((r - l) / 2) + l;
        if (nums[mid] < nums[r]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

    return nums[l];
};