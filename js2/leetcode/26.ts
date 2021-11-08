/**
 * @file 26. 删除有序数组中的重复项
 * @link https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 * 暴力解法，应该有更优化的版本，但更优化的版本也挺麻烦
 */

function removeDuplicates(nums: number[]): number {
    let delNum = 0;
    for (let i = 0; i < nums.length - 1 - delNum;) {
        if (nums[i] === nums[i + 1]) {
            delNum++;
            for (let j = i + 1; j < nums.length - delNum; j++) {
                nums[j] = nums[j + 1];
            }
        } else {
            i++;
        }
    }
    return nums.length - delNum;
};