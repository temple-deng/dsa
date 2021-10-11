/**
 * @file 350 两个数组的交集2
 * @link https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/
 */

function intersect(nums1: number[], nums2: number[]): number[] {
    const map = new Map<number, number>();

    for (let val of nums1) {
        const count = map.get(val);
        if (count) {
            map.set(val, count + 1);
        } else {
            map.set(val, 1);
        }
    }

    const ret = [];
    for (let val of nums2) {
        const count = map.get(val);
        if (count) {
            map.set(val, count - 1);
            ret.push(val);
        }
    }
    return ret;
};