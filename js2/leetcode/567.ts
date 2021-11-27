/**
 * @file 567. 字符串的排列
 * @link https://leetcode-cn.com/problems/permutation-in-string/
 */

export function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) {
        return false;
    }


    let l = 0;
    let r = 0;
    let map = new Map();

    for (let i = 0; i < s1.length; i++) {
        const char = s1[i];
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }
    let mapRealSize = s1.length;

    while (r < s2.length) {
        const char = s2[r];
        // 找到一个正确的字符
        if (map.has(char) && map.get(char) !== 0) {
            map.set(char, map.get(char) - 1);
            mapRealSize--;
            if (mapRealSize === 0) {
                return true;
            }
            r++;
        } else if (map.has(char) && map.get(char) === 0) {
            // 这个字符也在 s1 中，但是出现次数超了，更新下窗口
            while (s2[l] !== char) {
                const curChar = s2[l];
                map.set(curChar, map.get(curChar) + 1);
                l++;
                mapRealSize++;
            }
            r++;
            l++;
        } else {
            // 当前字符不在 s1 的排列中，这时候，要恢复 map 内容，移动窗口指针
            while (l < r) {
                const char = s2[l];
                if (map.has(char)) {
                    map.set(char, map.get(char) + 1);
                } else {
                    map.set(char, 1);
                }
                mapRealSize++;
                l++;
            }
            r++;
            l++;
        }
    }

    return false;
};
