/**
 * @file 387 字符串中的第一个唯一字符
 * @link https://leetcode-cn.com/problems/first-unique-character-in-a-string/
 */

export function firstUniqChar(s: string): number {
    const map = new Map();

    for (let i = 0, len = s.length; i < len; i++) {
        const char = s[i];
        const num = map.get(char);
        map.set(char, num ? num + 1 : 1);
    }

    for (let i = 0, len = s.length; i < len; i++) {
        const char = s[i];
        if (map.get(char) === 1) {
            return i;
        }
    }
    return -1;
};