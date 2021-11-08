import { SortingHelper } from "../sortingHelper";
import { ArrayGenerator } from "../arrayGenerator";

let arr: number[];

beforeEach(() => {
    arr = ArrayGenerator.generateRandomArray(10000, 10000);
});

test('SelectionSort', () => {
    expect(SortingHelper.sortTest('SelectionSort', arr)).toBeTruthy();
});

test('SelectionSort', () => {
    expect(SortingHelper.sortTest('SelectionSort2', arr)).toBeTruthy();
});

test('InsertSort', () => {
    expect(SortingHelper.sortTest('InsertSort', arr)).toBeTruthy();
});

test('InsertSort2', () => {
    expect(SortingHelper.sortTest('InsertSort2', arr)).toBeTruthy();
});

test('MergeSort', () => {
    expect(SortingHelper.sortTest('MergeSort', arr)).toBeTruthy();
});

test('MergeSort2', () => {
    expect(SortingHelper.sortTest('MergeSort2', arr)).toBeTruthy();
});

test('MergeSort4', () => {
    expect(SortingHelper.sortTest('MergeSort4', arr)).toBeTruthy();
});

test('quickSort', () => {
    expect(SortingHelper.sortTest('QuickSort', arr)).toBeTruthy();
});

test('quickSort2', () => {
    expect(SortingHelper.sortTest('QuickSort2', arr)).toBeTruthy();
});

// test('quickSort3', () => {
//     const arr2 = [
//         6, 3, 8, 3, 5,
//         6, 8, 9, 6, 5
//     ];
//     console.log(arr2)
//     expect(SortingHelper.sortTest('QuickSort3', arr2)).toBeTruthy();
// });