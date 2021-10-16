// 虽然最后通过了，但感觉不是标准解法，一方面，没有考虑边界条件，另一方面提示用位运算，而我们用的是
// 类似 tcp 那种方法，激进的多加，不行就重来
function divide(dividend: number, divisor: number): number {
    let absDividend = Math.abs(dividend);
    let absDivisor = Math.abs(divisor);
    let res = 0;
    let num = 1;
    let sum = 0;
    let x = absDivisor;

    while (sum <= absDividend) {
        if (sum + x + x <= absDividend) {
            sum += x + x;
            res += num + num;
            x += x;
            num += num;
        } else if (sum + absDivisor <= absDividend) {
            sum += absDivisor;
            res += 1;
            x = absDivisor;
            num = 1;
        } else {
            break;
        }
    }

    if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
        res = -res;
    }
    return Math.min(res, Math.pow(2, 31) - 1);
};