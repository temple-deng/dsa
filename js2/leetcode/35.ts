/**
 * @file 35 搜索插入位置
 * @link https://leetcode-cn.com/problems/search-insert-position/
 * 二分搜索
 */

export function searchInsert(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (target < nums[mid]) {
            r = mid - 1;
        } else if (target > nums[mid]) {
            l = mid + 1;
        } else {
            return mid;
        }
    }

    return l;
};

// 忘了是哪个提了
function countCharacters(words: string[], chars: string): number {
    const map = new Map();
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const num = map.get(char);
        map.set(char, num ? num + 1 : 1);
    }

    let ret = 0;
    for (let i = 0; i < words.length; i++) {
        const copy = new Map(map);
        const str = words[i];
        let j = 0; 
        for (; j < str.length + 1; j++) {
            const char = str[j];
            const num = copy.get(char);
            if (num) {
                copy.set(char, num - 1);
            } else {
                break;
            }
        }
        if (j === str.length) {
            ret += str.length;
        }
    }
    return ret;
};