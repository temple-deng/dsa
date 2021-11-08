/**
 * @file 500 键盘行
 * @link https://leetcode-cn.com/problems/keyboard-row/
 * @desc 这个没啥好说的，就是遍历吧
 */

export function findWords(words: string[]): string[] {
    const ret = [];
    const line = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm',
    ];
    const mapArr = [new Map(), new Map(), new Map()];
    for (let i = 0; i < 3; i++) {
        const str = line[i];
        const map = mapArr[i];
        for (let j = 0; j < str.length; j++) {
            map.set(str[j], 1);
        }
    }

    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        for (let k = 0; k < 3; k++) {
            const map = mapArr[k];
            let j = 0;
            for(; j <= word.length; j++) {
                if (!map.has(word[j])) {
                    break;
                }
            }
            if (j === word.length) {
                ret.push(words[i]);
                break;
            }
        }
    }
    return ret;
};