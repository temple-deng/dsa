/**
 * @file
 */

let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

export function updateMatrix(mat: number[][]): number[][] {
    const m = mat.length;
    const n = mat[0].length;
    const res: number[][] = [];
    let q: number[][] = [];


    for (let i = 0; i < m; i++) {
        res[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            if (!mat[i][j]) {
                res[i][j] = 0;
                q.push([i, j]);
            }
        }
    }

    while (q.length) {
        const front = q.shift()!;
        const [i, j] = front;

        for (let k = 0; k < dir.length; k++) {
            const [dx, dy] = dir[k];
            const [x, y] = [dx + i, dy + j];
            if (x >= 0 && y >= 0 && x < m && y < n && res[x][y] === undefined) {
                res[x][y] = res[i][j] + 1;
                q.push([x, y]);
            }
        }
    }

    return res;
};

