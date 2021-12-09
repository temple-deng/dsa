/**
 * @file 506. 相对名次
 * @link https://leetcode-cn.com/problems/relative-ranks/
 */


export function findRelativeRanks(score: number[]): string[] {
    const arr = [];
    for (let i = 0; i < score.length; i++) {
        arr.push({
            point: score[i],
            index: i,
        });
    }

    arr.sort((a, b) => {
        return b.point - a.point;
    });

    const res = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        const {index} = arr[i];
        switch (i) {
            case 0:
                res[index] = "Gold Medal";
                break;
            case 1:
                res[index] = "Silver Medal";
                break;
            case 2:
                res[index] = "Bronze Medal";
                break;
            default:
                res[index] = '' + i + 1;
        }
    }

    return res;
};

function moveZeroes(nums: number[]): void {
    let next = 0;
    
    for (let i = 0; i < nums.length; i++) {
        // 遇到一个非零数
        if (nums[i]) {
            if (i !== next) {
                const temp = nums[i];
                nums[i] = nums[next];
                nums[next] = temp;
            }
            next++;
        }
    }

};

function twoSum(numbers: number[], target: number): number[] {
    let l = 0;
    let r = numbers.length - 1;

    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (sum === target) {
            return [l + 1, r + 1];
        } else if (sum < target) {
            l++;
        } else {
            r--;
        }
    }
    return [];
};

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