/**
 * @file 784
 */

export {}

const map = new Map<string, string>([
    ['a', 'A'],
    ['b', 'B'],
    ['c', 'C'],
    ['d', 'D'],
    ['e', 'E'],
    ['f', 'F'],
    ['g', 'G'],
    ['h', 'H'],
    ['i', 'I'],
    ['j', 'J'],
    ['k', 'K'],
    ['l', 'L'],
    ['m', 'M'],
    ['n', 'N'],
    ['o', 'O'],
    ['p', 'P'],
    ['q', 'Q'],
    ['r', 'R'],
    ['s', 'S'],
    ['t', 'T'],
    ['u', 'U'],
    ['v', 'V'],
    ['w', 'W'],
    ['x', 'X'],
    ['y', 'Y'],
    ['z', 'Z'],
])

function letterCasePermutation(s: string): string[] {
    let i = 0;
    for (; i < s.length; i++) {
        const char = s[i];
        if (map.has(char.toLowerCase())) {
            break;
        }
    }

    // 递归终止条件
    if (i === s.length) {
        return [s];
    }

    const res: string[] = [];
    const pers = letterCasePermutation(s.slice(i + 1));
    for (const per of pers.values()) {
        res.push(s.slice(0, i) + s[i] + per);
    }
    // 是个小写字母，那看大写字母
    if (map.has(s[i])) {
        for (const per of pers.values()) {
            res.push(s.slice(0, i) + s[i].toUpperCase() + per);
        }
    } else {
        for (const per of pers.values()) {
            res.push(s.slice(0, i)+ s[i].toLowerCase() + per);
        }
    }

    return res;
};