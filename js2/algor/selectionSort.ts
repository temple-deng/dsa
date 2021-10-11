/**
 * 选择排序，每次循环挑出一个最小的元素
 * @param nums 
 */

export function selectionSort(nums: number[]): number[] {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j;
            }
        }
        swap(nums, i, minIndex);
    }
    return nums;
}

export function selectionSort2(nums: number[]): number[] {
    for (let i = nums.length - 1; i > 0; i--) {
        let maxIndex = i;
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] > nums[maxIndex]) {
                maxIndex = j;
            }
        }
        swap(nums, i, maxIndex);
    }
    return nums;
}

function swap(nums: number[], index1: number, index2: number) {
    const temp = nums[index1];
    nums[index1] = nums[index2];
    nums[index2] = temp;
}

