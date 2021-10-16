/**
 * @file 1441 用栈操作构建数组
 * @link https://leetcode-cn.com/problems/build-an-array-with-stack-operations/
 */

function buildArray(target: number[], n: number): string[] {
    const ret = [];
    let cur = 1;
    let p = 0;

    while (p !== target.length) {
        const top = target[p];
        ret.push('Push');
        if (top === cur) {
            p++
        } else {
            ret.push('Pop');
        }
        cur++;
    }
    return ret;
};