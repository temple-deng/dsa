/**
 * @file 17. 电话号码的字母组合
 * @link https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
 */

const map = [
    [],
    [],
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z'],
];

// 23
export function letterCombinations(digits: string): string[] {
    if (!digits) {
        return [];
    }

    const res = [];
    const index = Number(digits[0]);
    const charArr = map[index];

    if (digits.length === 1) {
        return charArr;
    }

    for (let i = 0; i < charArr.length; i++) {
        const affix = letterCombinations(digits.slice(1));
        for (let j = 0; j < affix.length; j++) {
            res.push(charArr[i] + affix[j])
        }
    }

    return res;
};