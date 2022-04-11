export { }
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map = new Map();

    for (const [index, val] of nums.entries()) {
        if (map.has(val)) {
            const i = map.get(val);
            if (index - i <= k) {
                return true;
            }
        }
        map.set(val, index);
    }
    return false;
};