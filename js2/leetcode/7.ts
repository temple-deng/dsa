/**
 * @file 7 整数反转
 * @link https://leetcode-cn.com/problems/reverse-integer/
 * 其实整个题的难度不在反转，而在于溢出的判断，如何判断越界，我们这里的方法并没有处理这种
 * 情况，其实虽然结果对，但是解法不对
 */



export function reverse(x: number): number {
    const str = String(Math.abs(x));
    const rev = str.split('').reverse().join('');
    let res = Number(rev);
    res = x >= 0 ? res : -res;
    if (res < Math.pow(-2, 31) || res > Math.pow(2, 31) - 1) {
        return 0;
    }
    return res;
};