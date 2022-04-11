/**
 * @file
 */

const map = new Map([
    ['1', 'A'],
    ['2', 'B'],
    ['3', 'C'],
    ['4', 'D'],
    ['5', 'E'],
    ['6', 'F'],
    ['7', 'G'],
    ['8', 'H'],
    ['9', 'I'],
    ['10', 'J'],
    ['11', 'K'],
    ['12', 'L'],
    ['13', 'M'],
    ['14', 'N'],
    ['15', 'O'],
    ['16', 'P'],
    ['17', 'Q'],
    ['18', 'R'],
    ['19', 'S'],
    ['20', 'T'],
    ['21', 'U'],
    ['22', 'V'],
    ['23', 'W'],
    ['24', 'X'],
    ['25', 'Y'],
    ['26', 'Z'],
])

export {}

function numDecodings(s: string): number {
    // dp[i] 为 [0, i] 索引有几种解法
    // 所以问题转化为求 dp[s.length - 1]
    // 最后一个问题就是 dp[len - 2] + dp[len - 3]
    // 那我们迭代至少从 i = 2 开始
    if (s.length === 0) {
        return 0;
    }

    const dp: number[] = new Array(s.length);

    if (map.has(s[0])) {
        dp[0] = 1;
    } else {
        dp[0] = 0;
    }

    if (s.length === 1) {
        return dp[0]
    }

    // 求 dp[1]
    // 这里的请求要特别注意
    let count = 0;
    if (map.has(s.slice(0, 2))) {
        count++;
    }
    if (map.has(s[0]) && map.has(s[1])) {
        count++;
    }
    dp[1] = count;

    for (let i = 2; i < s.length; i++) {
        let count = 0;
        if (map.has(s[i])) {
            count += dp[i - 1];
        }

        if (map.has(s.slice(i - 1, i + 1))) {
            count += dp[i - 2];
        }

        dp[i] = count;
    }

    return dp.pop()!;
};