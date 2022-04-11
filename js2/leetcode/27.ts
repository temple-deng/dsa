export {}

function removeElement(nums: number[], val: number): number {
    let end = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            end++;
            nums[end] = nums[i];
        }
    }

    return end + 1;
};