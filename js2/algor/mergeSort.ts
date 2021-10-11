/**
 * @file 归并排序 mergeSort(arr, l, r)  对 arr [l, r] 部分排序
 */

export function mergeSort(nums: number[]): number[] {
    return mergeSortR(nums, 0, nums.length - 1);
}

function mergeSortR(nums: number[], left: number, right: number): number[] {
    if (left === right) {
        return [nums[left]];
    }

    const mid = left + Math.floor((right - left) / 2);
    const ret = merge(mergeSortR(nums, left, mid), mergeSortR(nums, mid + 1, right));
    return ret;
}

/**
 * 合并两个数组
 * @param nums1 
 * @param nums2 
 */
function merge(nums1: number[], nums2: number[]): number[] {
    let i = 0;
    let j = 0;
    const ret = [];

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            ret.push(nums1[i]);
            i++;
        } else {
            ret.push(nums2[j]);
            j++;
        }
    }

    while (i < nums1.length) {
        ret.push(nums1[i]);
        i++
    }

    while(j < nums2.length) {
        ret.push(nums2[j]);
        j++
    }
    return ret;
}

export function mergeSort2(nums: number[]) {
    mergeSortR2(nums, 0, nums.length - 1);
}

function mergeSortR2(nums: number[], left: number, right: number) {
    if (left >= right) {
        return;
    }
    const mid = left + Math.floor((right - left) / 2);
    mergeSortR2(nums, left, mid);
    mergeSortR2(nums, mid + 1, right);
    merge2(nums, left, mid, right);
}

function merge2(nums: number[], left: number, mid: number, right: number) {
    const copy = nums.slice(left, right + 1);
    let i = left;
    let j = mid + 1;
    let k = i;

    while (k <= right) {
        if (i > mid) {
            nums[k] = copy[j - left];
            j++;
        } else if (j > right) {
            nums[k] = copy[i - left];
            i++;
        } else if (copy[i - left] <= copy[j - left]) {
            nums[k] = copy[i - left];
            i++
        } else {
            nums[k] = copy[j - left];
            j++;
        }
        k++;
    }
}