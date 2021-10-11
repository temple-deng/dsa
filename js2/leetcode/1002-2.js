/**
 * @file 查找共用字符 - 暴力解法优化版，添加了 break 语句，第一次遍历的时候减少了 map 中的数量
 *      但是看性能提升并不明显，反而是使用正则的方式的最快，难以理解
 * @link https://leetcode-cn.com/problems/find-common-characters/
 */

function commonChars(words) {
    const word1 = words[0];
    const word1Map = new Map();
    for (let char of word1) {
        const num = word1Map.get(char);
        word1Map.set(char, num ? num + 1 : 1);
    }

    const mapArr = [];
    for (let i = 1, len = words.length; i < len; i++) {
        const word = words[i];
        const map = new Map();
        for (let char of word) {
            if (word1Map.has(char)) {
                const num = map.get(char);
                map.set(char, num ? num + 1 : 1);
            }
        }
        mapArr[i] = map;
    }


    const ret = [];
    for (let char of word1) {
        let had = true;
        for (let i = 1, len = mapArr.length; i < len; i++) {
            const map = mapArr[i];
            const num = map.get(char);
            if (num) {
                map.set(char, num - 1);
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
}

console.log(commonChars(["bella","label","roller"]));