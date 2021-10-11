/**
 * @file 349 两个数组的交集
 * @link https://leetcode-cn.com/problems/intersection-of-two-arrays/
 */

function intersection(nums1: number[], nums2: number[]): number[] {
    const set = new Set<number>();
    const set2 = new Set<number>();

    for (let i = 0, len = nums1.length; i < len; i++) {
        set.add(nums1[i]);
    }

    for (let i = 0, len = nums2.length; i < len; i++) {
        if (set.has(nums2[i])) {
            set2.add(nums2[i]);
        }
    }
    return Array.from(set2);
};