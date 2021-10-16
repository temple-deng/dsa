/**
 * 插入排序，想象打扑克牌，每次将右边未排序的牌中第一张插入到左边已排序牌中的正确位置
 * @param nums 
 */

import { SortingHelper } from './sortingHelper';

export function insertSort(nums: number[]): number[] {
    // 外层循环，一次看一张未排序的牌
    for (let i = 1; i < nums.length; i++) {
        // 内层循环，往前找，找到正确位置
        for (let j = i - 1; j >= 0 && nums[j] > nums[j + 1]; j--) {
            SortingHelper.swap(nums, j, j + 1);
        }
    }
    return nums;
}

export function insertSort2(nums: number[]): number[] {
    // 外层循环，一次看一张未排序的牌
    for (let i = 1; i < nums.length; i++) {
        // 内层循环，往前找，找到正确位置
        const cur = nums[i];
        let j = i - 1;
        for (; j >= 0 && nums[j] > cur; j--) {
            nums[j + 1] = nums[j];
        }
        nums[j + 1] = cur;
    }
    return nums;
}