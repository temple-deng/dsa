/**
 * 
 */
import { selectionSort, selectionSort2 } from './selectionSort';
import { insertSort, insertSort2 } from './insertSort';
import { mergeSort } from './mergeSort';

export class SortingHelper {
    static isSorted(nums: number[]): boolean {
        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] - nums[i] > 0) {
                console.log(nums[i - 1], nums[i]);
                return false;
            }
        }
        return true;
    }

    static swap(arr: number[], i: number, j: number) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    static sortTest(sortName: string, arr: number[]) {
        const startTime = Date.now();
        switch (sortName) {
            case 'SelectionSort':
                selectionSort(arr);
                break;
            case 'SelectionSort2':
                selectionSort2(arr);
                break;
            case 'InsertSort':
                insertSort(arr);
                break;
            case 'InsertSort2':
                insertSort2(arr);
                break;
            case 'MergeSort':
                arr = mergeSort(arr);
                break;
        }

        const time = Date.now() - startTime;
        const isSorted = SortingHelper.isSorted(arr);
        if (!isSorted) {
            throw new Error();
        }
        console.log(`${sortName}: n = ${arr.length}; ${time / 1000}s`);
        return isSorted;
    }
}