/**
 * @file 剑指 offer 51 数组中的逆序对
 * @link https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/
 * @param nums 
 */

export function reversePairs(nums: number[]): number {
    return reverse(nums, 0, nums.length - 1);
};

function reverse(nums: number[], left: number, right: number): number {
    if (left >= right) {
        return 0;
    }

    const mid = left + Math.floor((right - left) / 2);
    const l = reverse(nums, left, mid);
    const r = reverse(nums, mid + 1, right);
    return l + r + merge(nums, left, mid, right);
}

function merge(nums: number[], left: number, mid: number, right: number): number {
    const copy = nums.slice(left, right + 1);
    let i = left;
    let j = mid + 1;
    let k = i;
    let ret = 0;

    while (k <= right) {
        if (i > mid) {
            nums[k] = copy[j - left];
            j++;
        } else if (j > right) {
            nums[k] = copy[i - left];
            i++;
        } else if (copy[i - left] <= copy[j - left]) {
            nums[k] = copy[i - left];
            i++;
        } else {
            nums[k] = copy[j - left];
            j++;
            ret += mid - i + 1;
        }
        k++;
    }
    return ret;
}