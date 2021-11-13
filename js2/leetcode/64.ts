/**
 * @file 64. 最小路径和
 * @link https://leetcode-cn.com/problems/minimum-path-sum/
 */

export function minPathSum(grid: number[][]): number {
    // 要求 m * n 的最小路径和，相当于求 [m - 1][n - 1] 索引处的数，和 [m-2][n-1] 及 [m-1][n-2]中较小的那个
    const m = grid.length;
    const n = grid[0].length;
    const pathSum: number[][] = [];

    for (let i = 0; i < m; i++) {
        pathSum[i] = new Array(n);
    }
    pathSum[0][0] = grid[0][0];
    for (let i = 1; i < n; i++) {
        pathSum[0][i] = pathSum[0][i - 1] + grid[0][i];
    }

    for (let i = 1; i < m; i++) {
        pathSum[i][0] = pathSum[i - 1][0] + grid[i][0];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            pathSum[i][j] = Math.min(pathSum[i - 1][j], pathSum[i][j - 1]) + grid[i][j];
        }
    }

    return pathSum[m - 1][n - 1];
};