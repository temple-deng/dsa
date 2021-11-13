/**
 * @file 401. 二进制手表
 * @link https://leetcode-cn.com/problems/binary-watch/
 */

export function readBinaryWatch(turnedOn: number): string[] {
    // 想要获取结果，我们就分别获取小时的可能性，以及分钟的可能性，然后做个组合
    // 获取这些数据可以，但是怎么做组合

    // 时针最多4个灯，所以查看下所有的可能
    for (let i = 0; i <= Math.min(turnedOn, 4); i++) {
        // 分针剩的灯数
        const minTurnedOn = turnedOn - i;
        const hours = readHours(i);
        const minutes = readMins(minTurnedOn);
    }
};


// 这个就转换成这样的问题，从一个数组中，找出 n 个数，使这个n个数的和 <= 11
function readHours(n: number): string[] {
    // 好家伙，这也是个组合问题
    if (n === 0) {
        return ['0'];
    }

    return combine([1, 2, 4, 8], n, 0, 11);
}

function readMins(n: number): string[] {

}

function combine(nums: number[], n: number, start: number, target: number): number[][] {
    const res = [];
    if (n === 1) {
        for (let i = start; i < nums.length; i++) {
            if (nums[i] <= target) {
                res.push([nums[i]]);
            }
        }
        return res;
    }

    // 寻找所有的可能组合
    for (let i = start; i < nums.length; i++) {
        if (target - nums[i] < 0) {
            continue;
        }
        const combs = combine(nums, n - 1, i + 1, target - nums[i]);
        for (let j = 0; j < combs.length; j++) {
            res.push([nums[i], ...combs[i]]);
        }
    }
    return res;
}