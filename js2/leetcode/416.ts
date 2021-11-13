/**
 * @file 416. 分割等和子集
 * @link https://leetcode-cn.com/problems/partition-equal-subset-sum/
 */

// 递归-记忆化搜索，自顶向下
export function canPartition(nums: number[]): boolean {
    const memo: boolean[][] = [];
    const n = nums.length;
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }

    sum = sum / 2;
    if (Math.floor(sum) !== sum) {
        return false;
    }

    for (let i = 0; i < nums.length; i++) {
        memo[i] = new Array( sum + 1);
    }

    return partition(nums, n - 1, sum, memo);
};


// 检查前 index 个元素中能否找出一个和为 sum 的子集
function partition(nums: number[], index: number, sum: number, memo: boolean[][]): boolean {
    if (index < 0) {
        return false;
    }

    if (sum === 0) {
        return true;
    }

    if (memo[index][sum] !== undefined) {
        return memo[index][sum];
    }

    let res = partition(nums, index - 1, sum, memo);
    if (sum - nums[index] >= 0) {
        res = res || partition(nums, index - 1, sum - nums[index], memo);
    }
    memo[index][sum] = res;
    return res;
}


function canPartition2(nums: number[]): boolean {
    // res[i][j] 表示从前 i 个元素中，是否可以找出一个和为 j 的子集
    const res = [];
    const n = nums.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += nums[i];
    }

    sum = sum / 2;
    if (Math.floor(sum) !== sum) {
        return false;
    }

    for (let i = 0; i < nums.length; i++) {
        res[i] = new Array(sum + 1);
        res[i][0] = nums[i] === 0;
    }
    for (let j = 1; j < sum + 1; j++) {
        res[0][j] = false;
    }

    for (let i = 1; i < nums.length; i++) {
        for (let j = 1; j < sum + 1; j++) {
            let result = res[i - 1][j];
            if (j - nums[i] >= 0) {
                result = result || res[i - 1][j - nums[i]];
            }
            res[i][j] = result;
        }
    }

    return res[n - 1][sum];
};