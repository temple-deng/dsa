/**
 * 随机 pivot 解决有序数组的问题
 * 双指针，解决重复元素的问题
 */
export function quickSort(arr: number[]) {
    quickSortR(arr, 0, arr.length - 1);
    return arr;
}

function quickSortR(arr: number[], left: number, right: number) {
    if (left >= right) {
        return;
    }

    const index = partition(arr, left, right);
    quickSortR(arr, left, index - 1);
    quickSortR(arr, index + 1, right);
}

function partition(arr: number[], l: number, r: number) {
    let i = l;
    let j = l + 1;
    const p = Math.ceil(Math.random() * (r - l)) + l;
    swap(arr, p, l);
    const pivot = arr[l];

    while (j <= r) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
        j++;
    }
    swap(arr, l, i);
    return i;
}

function swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export function quickSort2(arr: number[]) {
    quickSortR2(arr, 0, arr.length - 1);
    return arr;
}

function quickSortR2(arr: number[], left: number, right: number) {
    if (left >= right) {
        return;
    }

    const index = partition2(arr, left, right);
    quickSortR2(arr, left, index - 1);
    quickSortR2(arr, index + 1, right);
}

function partition2(arr: number[], l: number, r: number): number {
    const p = Math.ceil(Math.random() * (r - l)) + l;
    swap(arr, p, l);
    const pivot = arr[l];
    let i = l + 1;
    let j = r;

    while (true) {
        while (i <= j && arr[i] <= pivot) {
            i++;
        }
        while (j >= i && arr[j] >= pivot) {
            j--;
        }
        if (i < j) {
            swap(arr, i, j);
            i++;
            j--;
        }  else {
            break;
        }
    }
    swap(arr, l, j);
    return j;
}

export function quickSort3(arr: number[]): number[] {
    quickSortR3(arr, 0, arr.length - 1);
    return arr;
}

function quickSortR3(arr: number[], left: number, right: number) {
    if(left >= right) {
        return;
    }

    const [l, r] = partition3(arr, left, right);
    quickSortR3(arr, left, l);
    quickSortR3(arr, r, right);
}

function partition3(arr: number[], l: number, r: number): [number, number] {
    const p = Math.ceil(Math.random() * (r - l)) + l;
    console.log('p', p);
    swap(arr, p, l);
    console.log(arr);
    const pivot = arr[l];
    let i = l;
    let j = l;
    let k = l + 1;
    // [l + 1, i]  小于 pivot
    // [i + 1, j]  等于 pivot
    // [j + 1, k) 大于 pivot
    while (k <= r) {
        console.log('k', k, 'arr[k]--', arr[k])
        if (arr[k] < pivot) {
            i++;
            swap(arr, i, k);
            j++;
            swap(arr, j, k);
        } else if (arr[k] === pivot) {
            j++;
            swap(arr, j, k);
        }
        k++;
    }
    console.log('p', p, '-pivot', pivot,' -arr', arr);
    swap(arr, i - 1, l);
    return [i - 1, j + 1];
}
