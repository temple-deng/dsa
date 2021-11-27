/**
 * @file 
 */

export function lengthOfLastWord(s: string): number {
    let start = 0;
    let end = 0;
    let length = 0;

    while (end < s.length) {
        while (s[end] === ' ') {
            end++;
        }
        if (end < s.length) {
            start = end;

            while (end < s.length && s[end] !== ' ') {
                end++;
            }
            if (end >= s.length) {
                end--;
            }
            length = end - start + 1;
        }
    }

    return length;
};