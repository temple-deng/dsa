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

// 倒着来更容易，也更快
function lengthOfLastWord2(s: string): number {
    let end = s.length - 1;
    if (!s.length) {
        return 0;
    }

    while (end >= 0 && s[end] === ' ') {
        end--;
    }
    if (end === -1) {
        return 0;
    }
    let start = end;
    while (start >= 0 && s[start] !== ' ') {
        start--;
    }
    if (start === -1) {
        return end + 1;
    }
    return end - start;
};