/**
 * @file 3. 无重复字符的最长子串
 * @link https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 */

export function lengthOfLongestSubstring(s: string): number {
    let maxLen = 0;
    let l = 0;
    let r = 0;
    let map = new Map();

    while (r < s.length) {
        const char = s[r];
        if (map.has(char)) {
            const i = map.get(char);
            while (l <= i) {
                map.delete(s[l]);
                l++;
            }
            map.set(char, r);
        }
        map.set(char, r);
        maxLen = Math.max(maxLen, r - l + 1);
        r++;
    }

    return maxLen;
};