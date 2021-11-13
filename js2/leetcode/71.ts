/**
 * @file 71. 简化路径
 * @link https://leetcode-cn.com/problems/simplify-path/
 */

export function simplifyPath(path: string): string {
    const stack: string[] = [];
    for (let i = 0; i < path.length; i++) {
        const char = path[i];
        switch (char) {
            case '/':
                if (stack.length === 0 || stack[stack.length - 1] !== '/') {
                    stack.push('/');
                }
                break;
            case '.':
                // 遇到 . 该怎么处理
                // 首先看是不是 3 个点连着，3个点连着就是普通目录名
                if (stack.length && stack[stack.length - 1] !== '/') {
                    stack.push('.');
                } else {
                    let str = '.';
                    while (i + 1 < path.length && path[i + 1] === '.') {
                        i++;
                        str += '.';
                    }
                    if (str.length == 1 && (i + 1 >= path.length || path[i + 1] === '/')) {
                        stack.length > 1 && stack.pop();
                    } else if (str.length === 2 && (i + 1 >= path.length || path[i + 1] === '/')) {
                        stack.length > 1 && stack.pop();
                        while (stack.length && stack[stack.length - 1] !== '/') {
                            stack.pop();
                        }
                    } else {
                        stack.push(str);
                    }
                }
                break;
            default:
                stack.push(char);
                break;

        }
    }

    if (stack.length > 1 && stack[stack.length - 1] === '/') {
        stack.pop();
    }
    return stack.join('');
};

// 这种用 split 的方法，感觉有点脏,
export function simplifyPath2(path: string): string {
    const splits = path.split('/');
    const stack: string[] = [];

    for (let i = 0; i < splits.length; i++) {
        const str = splits[i];
        if (str) {
            if (str === '.') {
                continue;
            } else if (str === '..') {
                if (stack.length > 1) {
                    stack.pop();

                    if (stack.length > 1) {
                        stack.pop();
                    }
                }
            } else {
                if (stack.length && stack[stack.length - 1] === '/') {
                    stack.push(str);
                } else {
                    stack.push('/', str);
                }
            }
        }
    }

    if (stack.length) {
        return stack.join('');
    } else {
        return '/'
    }
}