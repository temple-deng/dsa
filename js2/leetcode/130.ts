/**
 * @file 130. 被围绕的区域
 * @link https://leetcode-cn.com/problems/surrounded-regions/
 */

let m:number;
let n:number;
let visited: number[][];

export function solve(board: string[][]): void {
    m = board.length;
    n = board[0].length;

    visited = new Array(m);
    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n);
    }

    for (let i = 0; i < n; i++) {
        if (board[0][i] === 'O' && !visited[0][i]) {
            floodfill(board, 0, i);
        }
        if (board[m - 1][i] === 'O' && !visited[m - 1][i]) {
            floodfill(board, m - 1, i);
        }
    }

    for (let i = 1; i < m - 1; i++) {
        if (board[i][0] === 'O' && !visited[i][0]) {
            floodfill(board, i, 0);
        }

        if (board[i][n - 1] === 'O' && !visited[i][n - 1]) {
            floodfill(board, i, n - 1);
        }
    }

    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if (!visited[i][j] && board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }
};

const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
function floodfill(board: string[][], x: number, y: number) {
    visited[x][y] = 1;

    for (let i = 0; i < 4; i++) {
        let d = dir[i];
        let nx = x + d[0];
        let ny = y + d[1];
        if (nx >= 0 && ny >= 0 && nx < m && ny < n && board[nx][ny] === 'O' && !visited[nx][ny]) {
            floodfill(board, nx, ny);
        }
    }
}