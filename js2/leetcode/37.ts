/**
 * @file 37. 解数独
 * @link https://leetcode-cn.com/problems/sudoku-solver/
 */

export {}

let rowSetArr: Set<string>[] = []
let colSetArr: Set<string>[] = [];
let rectSetArr: Set<string>[] = [];

function solveSudoku(board: string[][]): void {
    for (let i = 0; i < 9; i++) {
        rowSetArr[i] = new Set();
        colSetArr[i] = new Set();
        rectSetArr[i] = new Set();
    }


    let paddingNum = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const rectIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            const char = board[i][j];
            if (char !== '.') {
                rowSetArr[i].add(char);
                colSetArr[j].add(char);
                rectSetArr[rectIndex].add(char);
                paddingNum++;
            }
        }
    }

    solve(board, paddingNum);
    rowSetArr = []
    colSetArr = [];
    rectSetArr = [];
}

function solve(board: string[][], paddingNum: number): boolean {
    if (paddingNum === 81) {
        return true;
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const char = board[i][j];

            // 填空
            if (char === '.') {
                const rectIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                let findOne = false;
                for (let k = 1; k <= 9; k++) {
                    const kS = '' + k;
                    // 什么情况下是不合法可以提前退的呢
                    if (!rowSetArr[i].has(kS) && !colSetArr[j].has(kS) && !rectSetArr[rectIndex].has(kS)) {
                        board[i][j] = kS;
                        paddingNum++;
                        rowSetArr[i].add(kS);
                        colSetArr[j].add(kS);
                        rectSetArr[rectIndex].add(kS);
                        findOne = solve(board, paddingNum) || findOne;
                        if (findOne) {
                            return true;
                        }
                        board[i][j] = '.';
                        paddingNum--;
                        rowSetArr[i].delete(kS);
                        colSetArr[j].delete(kS);
                        rectSetArr[rectIndex].delete(kS);
                    }
                }
                if (!findOne) {
                    return false;
                }
            }
        }
    }

    return false;
}
