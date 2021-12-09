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

// 使用O(1)的空间，如何处理呢，这其实还是 o(k) 的吧
// O(1) 的感觉可能要一步一步的移，这时间复杂度不太好了就
function rotate(nums: number[], k: number): void {
    k = k % nums.length;
    if (k === nums.length) {
        return;
    }

    const first = nums.slice(nums.length - k);
    for (let i = nums.length - k - 1; i >= 0; i--) {
        nums[i + k] = nums[i];
    }
    for (let i = 0; i < first.length; i++) {
        nums[i] = first[i];
    }
}