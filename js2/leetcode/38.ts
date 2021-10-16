/**
 * @file 38 外观数列
 * @link https://leetcode-cn.com/problems/count-and-say/
 * 这个题比较简单，就是考递归
 */

export function countAndSay(n: number): string {
    if (n === 1) {
        return '1';
    }

    let str = countAndSay(n - 1);
    let res = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        let num = 1;
        while (i + 1 < str.length && str[i + 1] === char) {
            num++;
            i++;
        }
        res += `${num}${char}`;
    }
    return res;
};
