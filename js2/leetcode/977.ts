/**
 * @file 977. 有序数组的平方
 * @link https://leetcode-cn.com/problems/squares-of-a-sorted-array/
 */

// 基于排序的解法
export function sortedSquares2(nums: number[]): number[] {
    for (let i = 0; i < nums[i]; i++) {
        nums[i] = nums[i] * nums[i];
    }

    return nums.sort((a, b) => a - b);
};

// 对撞指针
function sortedSquares(nums: number[]): number[] {
    let l = 0;
    let r = nums.length - 1;
    let i = nums.length - 1;
    const res = [];

    while (l <= r) {
        const absL = Math.abs(nums[l]);
        const absR = Math.abs(nums[r]);
        if (absL >= absR) {
            res[i] = nums[l] * nums[l];
            l++;
        } else {
            res[i] = nums[r] * nums[r];
            r--;
        }
        i--;
    }
    return res;
};

function rotate(nums: number[], k: number): void {
    k = k % nums.length;
    if (k === nums.length) {
        return;
    }

    const first = nums.slice(nums.length - k);
    for (let i = k; i >= 0; i--) {
        nums[i + k] = nums[i];
    }
    for (let i = 0; i < first.length; i++) {
        nums[i] = first[i];
    }
};

function sortedSquares2(nums: number[]): number[] {
    let n = nums.length;

    let i = 0;
    while (i < n && nums[i] < 0) {
        i++;
    }

    if (i === 0) {
        return nums.map(n => n * n);
    } else {
        let l = i - 1;
        let r = i;
        const ret = [];
        while (l >= 0 || r < n) {
            if (l < 0) {
                ret.push(nums[r] * nums[r]);
                r++;
            } else if (r >= n) {
                ret.push(nums[l] * nums[l]);
                l--;
            } else if (Math.abs(nums[l]) <= Math.abs(nums[r])) {
                ret.push(nums[l] * nums[l]);
                l--;
            } else {
                ret.push(nums[r] * nums[r]);
                r++;
            }
        }
        return ret;
    }
};