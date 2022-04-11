/**
 * 
 */

export {}

function searchRange(nums: number[], target: number): number[] {
    let start = -1;
    let end = -1;

    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];
        if (n === target) {
            if (start === -1) {
                start = i;
                end = i;
            } else {
                end = i;
            }
        }
    }

    return [start, end];

    // 二分搜索
    // 搜到一个，怎么办
    // 搜索 target + 1
};