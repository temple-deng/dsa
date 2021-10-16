/**
 * @file 剑指 offer 69 山峰数组的顶部
 * @link https://leetcode-cn.com/problems/B1IidL/
 * O(n) 复杂度的很简单，只要找到第一个逆序对就行
 * O(logn) 的话，感觉是应该需要使用二分搜索的
 */

export function peakIndexInMountainArray(arr: number[]): number {
    let i = 0;
    for (; i < arr.length - 1 && arr[i] < arr[i + 1];i++) {}
    return i;
};

function peakIndexInMountainArray2(arr: number[]): number {
    let l = 0;
    let r = arr.length - 1;

    while (l < r) {
        const mid = l + Math.floor((r - l) / 2);
        const left = arr[l];
        const right = arr[r];
        const cur = arr[mid];

        if (left <= cur && cur <= right) {
            l = mid;
        } else if (left >= cur && cur >= right) {
            r = mid;
        } else {
            if (arr[mid - 1] <= cur && cur <= arr[mid + 1]) {
                l = mid;
            } else if (arr[mid - 1] >= cur && cur >= arr[mid + 1]) {
                r = mid;
            } else {
                return mid;
            }
        }
    }
    return l;
};