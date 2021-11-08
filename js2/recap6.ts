/**
 * 快排的3种写法
 * @param arr 
 * @returns 
 */

function quickSort(arr: number[]): number[] {
    quickSortR(arr, 0, arr.length - 1);
    return arr;
}

function quickSortR(arr: number[], l: number, r: number) {
    if (l >= r) {
        return;
    }

    const p = partition(arr,l ,r);
    quickSortR(arr, l, p - 1);
    quickSortR(arr, p + 1, r);
}

function partition(arr: number[], l: number, r:number): number {
    const random = Math.ceil(Math.random() * (r - l)) + l;
    swap(arr, l, random);
    const pivot = arr[0];

    // i, j
    // [l, i] < pivot
    // [i + 1, j) >= pivot
    let j = l;
    let i = l + 1;
    while (i <= r) {
        if (arr[i] < pivot) {
            j++;
            swap(arr, i, j);
        }
        i++;
    }
    swap(arr, j, l);
    return j;
}

function swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function quickSortR2(arr: number[], l: number, r: number) {
    if (l >= r) {
        return;
    }

    const p = partition2(arr, l, r);
    quickSortR2(arr, l, p - 1);
    quickSortR2(arr, p + 1, r);
}

function partition2(arr: number[], l: number, r: number): number {
    const random = Math.ceil(Math.random() * (r - l)) + l;
    swap(arr, l, random);
    const pivot = arr[0];

    // [i, j]
    let i = l;
    let j = r + 1;
    // [l + 1, i] <= pivot
    // [j, r] >= pivot
    while (i < j) {
        while (i < j && arr[i] < pivot) {
            i++;
        }
        while (i < j && arr[j] > pivot) {
            j--;
        }
        if (i < j) {
            swap(arr, i, j);
        }
        i++;
        j--;
    }
    swap(arr, i, l);
    return i;
}

function quickSortR3(arr: number[], l: number, r: number) {
    if (l >= r) {
        return;
    }
    const [p1, p2] = partition3(arr, l, r);
    quickSortR3(arr, l, p1 - 1);
    quickSortR3(arr, p2 + 1, r);
}

function partition3(arr: number[], l: number, r: number): [number, number] {
    const random = Math.ceil(Math.random() * (r - l)) + l;
    swap(arr, l, random);
    const pivot = arr[0];

    let i = l;
    let k = l + 1;
    let j = r + 1;
    while (k < j) {
        if (arr[k] < pivot) {
            i++;
            swap(arr, i, k);
            k++
        } else if (arr[k] > pivot) {
            j--;
            swap(arr, j, k);
        } else {
            k++;
        }
    }

    swap(arr, i, l);
    return [i, j - 1];
}

// 冒泡是个啥思想来着，一个个冒下去，或者一个个冒上来
function bubbleSort(arr: number[]): number[] {
    // 先写个冒上来的吧

    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}