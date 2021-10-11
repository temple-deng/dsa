/**
 * @file 查找共用字符 - 暴力解法
 * @link https://leetcode-cn.com/problems/find-common-characters/
 */

function commonChars(words) {
    const mapArr = [];
    for (let i = 1, len = words.length; i < len; i++) {
        const map = new Map();
        const word = words[i];
        for (let char of word) {
            const num = map.get(char);
            if (num) {
                map.set(char, num + 1);
            } else {
                map.set(char, 1);
            }
        }
        mapArr[i] = map;
    }

    const ret = [];
    const word = words[0];
    for (let i = 0, len = word.length; i < len; i++) {
        const char = word[i];
        let had = true;
        for (let i = 1, l = mapArr.length; i < l; i++) {
            const map = mapArr[i];
            if (map.has(char)) {
                const num = map.get(char);
                if (num === 1) {
                    map.delete(char);
                } else {
                    map.set(char, num - 1);
                }
            } else {
                had = false;
            }
        }
        if (had) {
            ret.push(char);
        }
    }
    return ret;
};

console.log(commonChars(["bella","label","roller"]));