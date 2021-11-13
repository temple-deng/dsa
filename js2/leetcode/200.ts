/**
 * @file 200
 */

// 我觉得大体思路是这样的，根本上就是遍历所有网格，每次遇到 0，不管
// 遇到 1 的话，从这个点开始，将矩阵内和他相邻的 1 都赋值，这样就标记出一块岛屿
// 直到所有网格都遍历完

let m: number;
let n: number;
let visited: number[][];
let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
export function numIslands(grid: string[][]): number {
    let res = 0;
    m = grid.length;
    n = grid[0].length;
    visited = new Array(m);
    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1' && !visited[i][j]) {
                res += 1;
                floodfill(grid, i, j);
            }
        }
    }

    return res;
};

function floodfill(grid: string[][], i: number, j: number): void {
    visited[i][j] = 1;

    for (let k = 0; k < dir.length; k++) {
        const d = dir[k];
        const newX = i + d[0];
        const newY = j + d[1];
        if (newX >= 0 && newY >= 0 && newX < m && newY < n && !visited[newX][newY] && grid[newX][newY] === '1') {
            floodfill(grid, newX, newY);
        }
    }
}