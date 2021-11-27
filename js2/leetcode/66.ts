/**
 * @file 66. 加一
 * @link https://leetcode-cn.com/problems/plus-one/
 */

export function plusOne(digits: number[]): number[] {
    let carry = 1;
    for (let i = digits.length - 1; i >= 0; i++) {
        let sum = carry + digits[i];
        if (sum >= 10) {
            sum -= 10;
            carry = 1;
        } else {
            carry = 0;
        }
        digits[i] = sum;
    }

    if (carry) {
        digits.unshift(1);
    }
    return digits;
};