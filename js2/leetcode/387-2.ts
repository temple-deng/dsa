export function firstUniqChar(s: string): number {
    const dup: {[index: string]: boolean} = {};
    for (let i = 0, len = s.length; i < len; i++) {
        const char = s[i];
        if (s.slice(i + 1).indexOf(char) === -1 && !dup[char]) {
            return i;
        } else {
            dup[char] = true;
        }
    }
    return -1;
};