function isValidSudoku(board: string[][]): boolean {
    // 先看行

    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        const set = new Set();
        for (let j = 0; j < row.length; j++) {
            if (board[i][j] !== '.') {
                if (set.has(board[i][j])) {
                    return false;
                }
                set.add(board[i][j]);
            }
        }
    }

    // 再看列
    for (let i = 0; i < board[0].length; i++) {
        const set = new Set();

        for (let j = 0; j < board.length; j++) {
            if (board[j][i] !== '.') {
                if (set.has(board[j][i])) {
                    return false;
                }
                set.add(board[j][i]);
            }
        }
    }

    // 然后就是九宫格了，
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const set = new Set();
            for (let m = i * 3; m < (i + 1) * 3; m++) {
                for (let n = j * 3; n < (j + 1) * 3; n++) {
                    if (board[m][n] !== '.') {
                        if (set.has(board[m][n])) {
                            return false;
                        }
                        set.add(board[m][n]);
                    }
                }
            }
        }
    }

    return true;
};

export {}