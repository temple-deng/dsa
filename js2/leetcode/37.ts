/**
 * @file 37. 解数独
 * @link https://leetcode-cn.com/problems/sudoku-solver/
 */

const rect: number[][][] = [];
const row: number[][] = [];
const col: number[][] = [];

function solveSudoku(board: string[][]): void {
    // 3 * 3 的格子，每一个 item 代表一个九宫格，而每一个 item 又是一个有 9 个元素的数组
    // rect[i][j][k] 代表第 (i, j) 个九宫格中是否存在数字 k
    for (let i = 0; i < 3; i++) {
        rect[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            rect[i][j] = new Array(9);
        }
    }

    for (let i = 0; i < 9; i++) {
        row[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            const n = Number(board[i][j]);
            col[j] = new Array(9);
            if (!isNaN(n)) {
                row[i][n - 1] = 1;
                col[j][n - 1] = 1;
                rect[Math.floor(i / 3)][Math.floor(j / 3)][n - 1] = 1;
            } else {
                row[i][n - 1] = 0;
                col[j][n - 1] = 0;
                rect[Math.floor(i / 3)][Math.floor(j / 3)][n - 1] = 0;
            }
        }
    }

    solve(board, 0);
};

// 重点还是在如何判断当前位置可不可以放置一个皇后/可以放置哪些数字，然后这些数字依次尝试
// 但是这里其实是有个问题，如果我们找到了一个解，如何中断后面的流程
// 如何访问哪些数，直接用 board 就好，麻烦的是 board 内每个九宫格的互斥吧
// Math.floor(x / 3) + Math.floor(y / 3) 是格子的索引
// 简化一下想法，就是如何在 O(1) 的时间复杂度，看一下格子中是否有当前的数

function solve(board: string[][], index: number): boolean {
    if (index === 9) {
        return true;
    }

    // 检查这一行所有列 i 是列索引
    for (let i = 0; i < 9; i++) {
        // 先看这个位置有没有数，有数这个位置有不用看，换下一个
        if (board[index][i] === '.') {
            for (let n = 1; n <= 9; n++) {
                // 检查这个数用过没，如果没用过就尝试放置数求解，否则换下一个数
                // 先看这一行有用吗
                if (!row[index][n - 1] && !col[i][n - 1] && !rect[Math.floor(index / 3)][Math.floor(i / 3)][n - 1]) {
                    // 找到一个这个位置可放的数
                    row[index][n - 1] = 1;
                    col[i][n - 1] = 1;
                    rect[Math.floor(index / 3)][Math.floor(i / 3)][n - 1] = 1;
                    board[index][i] = String(n);
                    if (solve(board, index + 1)) {
                        return true;
                    }
                    row[index][n - 1] = 0;
                    col[i][n - 1] = 0;
                    rect[Math.floor(index / 3)][Math.floor(i / 3)][n - 1] = 0;
                    board[index][i] = '.';
                }
            }
        }
    }

    return false;
}