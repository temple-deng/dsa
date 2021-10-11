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