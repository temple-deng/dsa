/**
 * 
 */

export {}

function getMaxLen(nums: number[]): number {

    const max: number[] = [nums[0] > 0 ? 1 : 0];
    const min: number[] = [nums[0] < 0 ? 1 : 0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > 0) {
            max[i] = Math.max(1, max[i - 1] + 1);
            min[i] = min[i - 1] > 0 ? min[i - 1] + 1 : 0;
        } else if (nums[i] < 0){
            max[i] = min[i - 1] > 0 ? min[i - 1] + 1 : 0;
            min[i] = max[i - 1] + 1;
        } else {
            max[i] = 0;
            min[i] = 0;
        }
    }

    return Math.max(...max);
};


