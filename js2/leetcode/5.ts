/**
 * @file 5. 最长回文子串
 * @link https://leetcode-cn.com/problems/longest-palindromic-substring/
 */

// 虽然解出来了，但是时间复杂度明显不合适
export function longestPalindrome(s: string): string {
    // memo[i][j] 表示一个 [i, j] 的一个回文串
    const memo: boolean[][] = [];
    const n = s.length;

    memo[0] = new Array(n);
    for (let i = 0; i < n; i++) {
        memo[0][i] = isPalindrome(s, 0, i);
    }
    for (let j = 1; j < n; j++) {
        memo[j] = new Array(n);
        memo[j][0] = false;
    }

    for (let i = 1; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (memo[i][j] === undefined) {
                let res = s[i] === s[j];
                if (res && i + 1 <= j - 1) {
                    const sub = isPalindrome(s, i + 1, j - 1);
                    memo[i + 1][j - 1] = sub;
                    res = res && sub;
                }
                memo[i][j] = res;
            }
        }
    }

    let max = [0, 0];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (memo[i][j] && j - i >= max[1] - max[0]) {
                max = [i, j];
            }
        }
    }

    return s.slice(max[0], max[1] + 1);
};

function isPalindrome(str: string, start: number, end: number): boolean {
    let l = start;
    let r = end;

    while (l <= r) {
        if (str[l] !== str[r]) {
            return false;
        }
        l++;
        r--;
    }

    return true;
}