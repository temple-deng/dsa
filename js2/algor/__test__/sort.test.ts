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
