/**
 * @file 557. 反转字符串中的单词 III
 * @link https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/
 */

export function reverseWords(s: string): string {
    let start = 0;
    let end = 0;
    let str = '';


    while (end < s.length) {
        while (s[end] !== ' ' && end < s.length) {
            end++;
        }
        let e = end - 1;
        while (e >= start) {
            str += s[e];
            e--;
        }
        if (s[end] === ' ') {
            str += ' ';
        }
        end++;
        start = end;
    }

    return str;
};

function reverseWords2(s: string): string {
    let start = 0;
    let end = 0;
    const arr = [];

    while (end < s.length) {
        while (end < s.length && s[end] !== ' ') {
            end++;
        }
        let spaceIndex = end;
        end--;
        while (start <= end) {
            arr.push(s[end]);
            end--;
        }
        end = spaceIndex;
        while (end < s.length && s[end] === ' ') {
            arr.push(' ');
            end++;
        }
        start = end;
    }

    return arr.join('');
};