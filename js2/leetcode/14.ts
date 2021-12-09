/**
 * @file
 * @link
 */

export function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return '';
    }

    let i = 0;
    while (true) {
        let char = strs[0][i];

        for (let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== char) {
                return strs[0].slice(0, i);
            }
        }
        i++;
    }

    return strs[0];
};