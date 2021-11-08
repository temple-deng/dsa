/**
 * @file 476 数字的补数
 * @link https://leetcode-cn.com/problems/number-complement/
 * @param num 
 * @returns 
 */

function findComplement(num: number): number {
    const n = num.toString(2);
    let res = '';
    for (let i = 0; i < n.length; i++) {
        res += (+n[i] ? 0 : 1);
    }
    return parseInt(res, 2);
};