/**
 * @file 189. 轮转数组
 * @link https://leetcode-cn.com/problems/rotate-array/
 */

// 这里原地修改是个麻烦事，怎么原地修改
// 这个是借用额外空间的做法
export function rotate2(nums: number[], k: number): void {
    let n = nums.length;
    k = k % n;

    let arr = nums.slice(n - k).concat(nums.slice(0, n - k))
    for (let i = 0; i < n; i++) {
        nums[i] = arr[i];
    }
}

// 使用O(1)的空间，如何处理呢
function rotate(nums: number[], k: number): void {

}