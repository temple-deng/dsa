/**
 * @file
 * @link
 */

export function threeSumClosest(nums: number[], target: number): number {
    // 至少要列出所有的三数之和

    nums.sort((a, b) => a - b);

    let closetAbs = Infinity;
    let closestSum = Infinity;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let abs2 = Infinity
            for (let k = j + 1; k < nums.length; k++) {
                const sum = nums[i] + nums[j] + nums[k];
                let abs = Math.abs(target - sum);
                if (abs < abs2) {
                    abs2 = abs;
                    if (abs < closetAbs) {
                        closestSum = closestSum;
                    }
                } else {
                    break;
                }
            }
        }
    }

    return closestSum;
};