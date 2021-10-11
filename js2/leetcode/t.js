function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0, len = nums.length; i < len; i++) {
        const n = nums[i];
        console.log(n);
        console.log(map.has(target - n));
        console.log(map);
        if (map.has(target - n)) {
            return [map.get(target - n), i];
        } else {
            map.set(i, n);
        }
    }
    return [];
};

console.log(twoSum([2,7,11,15]), 9);