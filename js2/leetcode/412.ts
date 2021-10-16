/**
 * @file 412 Fizz Buzz
 * link https://leetcode-cn.com/problems/fizz-buzz/
 * @param n 
 */

function fizzBuzz(n: number): string[] {
    let ret = [];
    for (let i = 1; i < n + 1; i++) {
        const char = i;
        if (!(char % 3) || !(char % 5)) {
            let str = '';
            if (!(char % 3)) {
                str += 'Fizz';
            }
            if (!(char % 5)) {
                str += 'Buzz';
            }
            ret.push(str);
        } else {
            ret.push(String(char));
        }
    }
    return ret;
};