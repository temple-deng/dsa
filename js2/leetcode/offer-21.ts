function exchange(nums: number[]): number[] {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        while (l <= r && nums[l] % 2 === 1) {
            l++;
        }

        while (l <= r && nums[r] % 2 === 0) {
            r--;
        }

        if (l <= r) {
        swap(nums, l, r);
        l++;
        r--;
        }

    }
    return nums;
};

function swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
export {}