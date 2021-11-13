/**
 * @file 131. 分割回文串
 * @link https://leetcode-cn.com/problems/palindrome-partitioning/
 */

const set = new Set();

// 时间复杂度不太 OK，效率不高，但是也想不出怎么优化，看看学了动态规划会有方法吗
function partition(s: string): string[][] {
    if (s.length === 0) {
        return [];
    }

    if (s.length === 1) {
        return [[s]];
    }

    const res = [];
    if (isPal(s)) {
        res.push([s]);
    }

    for (let i = 1; i < s.length; i++) {
        const left = s.slice(0, i);
        const right = s.slice(i);
        if (isPal(left)) {
            const parts = partition(right);
            for (let j = 0; j < parts.length; j++) {
                res.push([left, ...parts[j]]);
            }
        }
    }

    return res;
};

function isPal(s: string): boolean {
    if (s.length === 1) {
        set.add(s);
        return true;
    }
    if (set.has(s)) {
        return true;
    }
    let i = 0;
    let j = s.length - 1;
    while (i < j) {
        if (s[i] === s[j]) {
            i++;
            j--;
        } else {
            return false;
        }
    }

    set.add(s);
    return true;
}