/**
 * @file 220. 存在重复元素 III
 * @link https://leetcode-cn.com/problems/contains-duplicate-iii/
 */

export function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
    // 建立一个查找表，一个滑动窗口
    let l = 0;
    let set = new Set<number>();
    let i = 0;

    // 虽然最后没报超时，但是用时还是很长，考虑耗时应该是集中在 set 的遍历上，这里应该怎么优化一下
    while (i < nums.length) {
        const n = nums[i];
        // 这里最好能用一个 O(1) 复杂度的检索就完成，理论上用一个有序集合，但是 js 里面如何使用
        // 有序集合呢
        for (const val of set.values()) {
            if (Math.abs(val - n) <= t) {
                return true;
            }
        }
        i++;
        // 是这的问题
        set.add(n);
        if (set.size > k) {
            set.delete(nums[l]);
            l++;
        }
    }

    return false;
};

/**
 * [1,2,3,1]
    k 3
    t = 0
 */
// i = 0, n = 1,  i++; set(1)
// i = 1; n = 2; i++; set(1, 2);
// i = 2; n = 3; i ++ , set(1, 2, 3);
// i = 
