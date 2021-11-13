/**
 * @file 62. 不同路径
 * @link https://leetcode-cn.com/problems/unique-paths/
 */


export function uniquePaths(m: number, n: number): number {
    const paths: number[][] = [];

    for (let i = 0; i < m ; i++) {
        paths[i] = new Array(n);
        paths[i][0] = 1;
    }

    for (let j = 1; j < n; j++) {
        paths[0][j] = 1;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            paths[i][j] = paths[i - 1][j] + paths[i][j - 1];
        }
    }

    return paths[m - 1][n - 1];
};