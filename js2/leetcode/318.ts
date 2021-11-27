/**
 * @file 318. 最大单词长度乘积
 * @link https://leetcode-cn.com/problems/maximum-product-of-word-lengths/
 */

export function maxProduct(words: string[]): number {
    // f(i) 表示前 i 个字符串中乘积最大的长度值
    // f(i) = max{str[i] * str[i - 1], str[i] * str[i - 2]..., f(i - 1)}

    if (words.length === 1) {
        return 0;
    }
    const maxLength: number[] = [0];
    const set: Set<string> = new Set();
    for (let i = 0; i < words[0].length; i++) {
        set.add(words[0][i]);
    }
    const setArr = [set];

    for (let i = 1; i < words.length; i++) {
        let maxL = maxLength[i - 1];
        const str = words[i];
        const set: Set<string> = new Set();
        for (let k = 0; k < str.length; k++) {
            set.add(str[k]);
        }
        setArr.push(set);
        for (let j = i - 1; j >= 0; j--) {
            if (!isIntersect(set, setArr[j])) {
                maxL = Math.max(maxL, str.length * words[j].length);
            }
        }

        maxLength[i] = maxL;
    }

    return maxLength[words.length - 1];
};

function isIntersect(set1: Set<string>, set2: Set<string>): boolean {
    for (const [val] of set1.values()) {
        if (set2.has(val)) {
            return true;
        }
    }

    return false;
}