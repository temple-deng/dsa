/**
 * @file 451 根据字符出现频率排序
 * @link https://leetcode-cn.com/problems/sort-characters-by-frequency/
 */

function frequencySort(s: string): string {
    const map = new Map();
    for (let i = 0, len = s.length; i < len; i++) {
        const char = s[i];
        const num = map.get(char);
        map.set(char, num ? num + 1 : 1);
    }

    const arr = Array.from(map);
    arr.sort((a, b) => {
        return b[1] - a[1];
    });
    const ret = arr.map(item => {
        return item[0].repeat(item[1]);
    });
    return ret.join();
};