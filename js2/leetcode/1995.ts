/**
 * 
 */

export {}

function countQuadruplets(nums: number[]): number {
    // 看起来是个 n的4次方的问题
    const n = nums.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                const sum = nums[i] + nums[j] + nums[k];
                for (let m = k + 1; m < n; m++) {
                    if (nums[m] === sum) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}