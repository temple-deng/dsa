function spiralOrder(matrix: number[][]): number[] {
    return spiralOrder2(matrix, 0, 0, matrix.length - 1, matrix[0].length - 1);

};

function spiralOrder2(matrix: number[][], sx: number, sy: number, ex: number, ey: number): number[] {
    let res = [];

    if (sx === ex) {
        res = matrix[sx].slice(sy, ey + 1);
        return res;
    }
    if (sy === ey) {
        for (let i = sx; i <= ex; i++) {
            res.push(matrix[i][sy]);
        }
        return res;
    }


    res.push(...matrix[sx].slice(sy, ey + 1));
    for (let i = sx + 1; i <= ex; i++) {
        res.push(matrix[i][ey]);
    }

    for (let i = ey - 1; i >= sy; i--) {
        res.push(matrix[ex][i]);
    }

    for (let i = ex - 1; i > sx; i--) {
        res.push(matrix[i][sy]);
    }

    return res.concat(spiralOrder2(matrix, sx + 1, sy + 1, ex - 1, ey - 1));
}

export {}