export {}

// 这双指针就完事了
function findLengthOfLCIS(nums: number[]): number {
    let l = 0;
    let maxLen = 1;
    let i = 1;

    for (; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            // 遇到一个不连续的点，计算长度，更新起始点
            const len = i - l;
            maxLen = Math.max(maxLen, len);
            l = i;
        }
    }

    // 有一个问题，可能最后一段就是连续的，最后这里没更新

    return  maxLen = Math.max(maxLen, i - l);;
};