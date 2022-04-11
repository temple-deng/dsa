export {}

// 这是一个空间复杂度 On 的算法，虽然不符合要求，但起码是一个解
function firstMissingPositive(nums: number[]): number {
    const arr = new Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= 0) {
            arr[nums[i]] = 1;
        }
    }

    for (let i = 1; i < arr.length; i++) {
        if (!arr[i]) {
            return i;
        }
    }
    return arr.length
};

function firstMissingPositive2(nums: number[]): number {
    // 针对 [1] 这种情况，是单元素的特例，还是其他的特例
    // 感觉是单元素的特例

    if (nums.length === 1) {
        if (nums[0] < 1) {
            return 1;
        } else if (nums[0] === 1) {
            return 2;
        } else {
            return 1;
        }
    }

    let i = 0;

    // 我觉得是直接在原数组上修改的
    // 如果当前元素是 <= 0 的，直接 i++
    // 否则，nums[nums[i]] = nums[i];
    // 如果 index = nums[i] 溢出，继续 i++

    while (i < nums.length && nums[i] <= nums.length) {
        if (nums[i] > 0 && nums[i] < nums.length) {
            // nums[nums[i]] = 
            // 这时候可能 nums[i] 在后面，需要换回来
            if (nums[i] > i) {
                // 这里就有死循环的可能性
                // 假设现在 nums[nums[i]] 就等于 nums[i]
                // 这时候就会在这里返回循环
                // const temp = nums[nums[i]];
                // nums[nums[i]] = nums[i];
                // nums[i] = temp;
                if (nums[nums[i]] !== nums[i]) {
                    const temp = nums[nums[i]];
                    nums[nums[i]] = nums[i];
                    nums[i] = temp;
                } else {
                    i++;
                }
            } else {
                nums[nums[i]] = nums[i];
                i++
            }
        } else {
            i++;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }

    return nums.length;
}