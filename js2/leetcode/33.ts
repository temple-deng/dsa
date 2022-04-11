/**
 * 
 */

export {}

function search(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        const mid = Math.floor((r - l) / 2) + l;
        const midN = nums[mid];

        if (midN === target) {
            return mid;
        }

        if (nums[l] < midN) {
            if (midN < nums[r]) {
                // 顺序的区间
                if (target < midN) {
                    // 左侧区间
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            } else {
                // mid 在左侧升高区间
                if (target < midN) {
                    // 这种情况就是无解啊，可能在左侧，也可能在右侧
                }
            }
        }
    }
};