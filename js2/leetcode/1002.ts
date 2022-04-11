/**
 * @file 查找共用字符 - 使用 obj 和 replace
 * @link https://leetcode-cn.com/problems/find-common-characters/
 */

function commonChars(words: string[]): string[] {
    const sortByLen = words.sort((a, b) => {
        return a.length - b.length;
    });
    const word1 = sortByLen[0];

    const ret = [];
    for (let i = 0, len1 = word1.length; i < len1; i++) {
        let had = true;
        const char = word1[i];
        for (let j = 1, len = sortByLen.length; j < len; j++) {
            const word = sortByLen[j];
            if (word.indexOf(char) !== -1) {
                sortByLen[j] = word.replace(char, '');
            } else {
                had = false;
                break;
            }
        }
        if (had) {
            ret.push(char);
        }
    }
    return ret;
};

function commonChars2(words: string[]): string[] {
    let map = new Map<string, number>();
        const firstWord = words[0];
        for (const char of firstWord) {
            if (map.has(char)) {
                map.set(char, map.get(char) + 1);
            } else {
                map.set(char, 1);
            }
        }
    
        for (let i = 1; i < words.length; i++) {
            const insectMap = new Map();
            const w = words[i];
            for (const char of w) {
                if (map.has(char)) {
                    if (insectMap.has(char)) {
                        insectMap.set(char, insectMap.get(char) + 1);
                    } else {
                        insectMap.set(char, 1);
                    }
                    map.set(char, map.get(char) - 1);
                    if (map.get(char) === 0) {
                        map.delete(char);
                    }
                }
            }
            map = insectMap;
        }
        const arr = [];
        for (const [key, value] of map.entries()) {
            let str = key.repeat(value);
            arr.push(...str);
        }
        return arr;
};