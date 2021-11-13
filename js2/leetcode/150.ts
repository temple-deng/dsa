/**
 * @file 150. 逆波兰表达式求值
 * @link https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/
 * @param tokens 
 * @returns 
 */

function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    const numReg = /\d+/;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (numReg.test(token)) {
            stack.push(Number(token));
        } else {
            if (stack.length < 2) {
                throw new Error();
            }
            const top1 = stack.pop();
            const top2 = stack.pop();
            switch (token) {
                case '+':
                    stack.push(top1 + top2);
                    break;
                case '-':
                    stack.push(top2 - top1);
                    break;
                case '*':
                    stack.push(top1 * top2);
                    break;
                case '/':
                    // 这里保持整数部分怎么看都是陷阱啊
                    if (top2 / top1 >= 0) {
                        stack.push(Math.floor(top2 / top1));
                    } else {
                        stack.push(Math.ceil(top2 / top1));
                    }
                    break;
            }
        }
    }

    return stack.pop();
};