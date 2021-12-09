/**
 * @file 695. 岛屿的最大面积
 * @link https://leetcode-cn.com/problems/max-area-of-island/
 */

let visited: boolean[][] = [];
let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

export function maxAreaOfIsland(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    let max = 0;

    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] && !visited[i][j]) {
                visited[i][j] = true;
                max = Math.max(getArea(grid, i, j));
                // visited[i][j] = false;
            }
        }
    }

    visited = [];
    return max;
};

function getArea(grid: number[][], x: number, y: number): number {
    let sum = 1;
    for (let i = 0; i < dir.length; i++) {
        let [dx, dy] = dir[i];
        const newX = x + dx;
        const newY = y + dy;
        if (
            newX >=0 && newY >= 0 && newX < grid.length
            && newY < grid[0].length && grid[newX][newY] && !visited[newX][newY]
        ) {
            visited[newX][newY] = true;
            sum += getArea(grid, newX, newY);
            // 这里其实回不回溯都差不多
            // visited[newX][newY] = false;
        }
    }

    return sum;
}