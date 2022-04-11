function isMonotonic(nums: number[]): boolean {
    if (nums.length === 0) {
        return true;
    }

    let i = 1;
    for (; i < nums.length; i++) {
        if (nums[i - 1] > nums[i]) {
            break;
        }
    }
    if (i === nums.length) {
        return true;
    }

    i = 1;

    for (; i < nums.length; i++) {
        if (nums[i - 1] < nums[i]) {
            return false;
        }
    }

    return true;
};

export {}