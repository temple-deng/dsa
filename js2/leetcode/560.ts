/**
 * 
 */

export {}
let count = 0;

function subarraySum(nums: number[], k: number): number {
    // 暴力解法比如说迭代所有子数组，找到一个解就加进去，最后返回即可
    // 这样看这可能是一个递归回溯算法
    // 可是又不像是可以剪枝的情况。。。。，那感觉就是暴力了啊
    findSubarray(nums, 0, nums.length - 1, k);
    let copy = count;
    count = 0;
    return copy;
};

function findSubarray(nums: number[], start: number, end: number, k: number) {
    if (start < end) {
        return;
    }

    if (start === end) {
        if (nums[start] === k) {
            count++;
        }

        return
    }

    for (let i = start; i <= end; i++) {
        for (let j = i; j <= end; j++) {
            findSubarray(nums, i, j, k);
        }
    }
}