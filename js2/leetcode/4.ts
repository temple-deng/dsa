/**
 * @file 4. 寻找两个正序数组的中位数
 * @link https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
 * @description 有点像 mergeSort 的归并过程
 */

export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // 数组是有序的，那我们其实就是
    const m = nums1.length;
    const n = nums2.length;
    const mid = Math.min((m + n) / 2);
    let index = 0;
    let before = 0;
    let after = 0;
    let i1 = 0;
    let i2 = 0;

    while (index <= mid) {
        before = after;
        if (i1 >= m) {
            // 第一个数组遍历完了
            after = nums2[i2];
            i2++;
        } else if (i2 >= n) {
            after = nums1[i1];
            i1++;
        } else if (nums1[i1] >= nums2[i2]) {
            after = nums2[i2];
            i2++;
        } else {
            after = nums1[i1];
            i1++;
        }
        index++;
    }

    if ((m + n) % 2) {
        return (before + after) / 2;
    } else {
        return after;
    }
};
