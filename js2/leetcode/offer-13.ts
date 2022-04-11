/**
 * 
 */

export {}

let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function movingCount(m: number, n: number, k: number): number {
    if (k === 0) {
        return 1;
    }

    const arr = new Array(m);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(n);
    }

    // 从4个位置出发，走动
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!arr[i][j] && sum(i, j) <= k) {
                moving(m, n, k, arr, i, j);
            }
        }
    }

    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (arr[i][j]) {
                count++;
            }
        }
    }

    return count;
};

function moving(m: number, n: number, k: number, arr: number[][], x: number, y: number) {
    arr[x][y] = 1;

    for (let i = 0; i < dirs.length; i++) {
        const [dx, dy] = dirs[i];
        const newX = dx + x;
        const newY = dy + y;
        if (newX >= 0 && newX < m && newY >= 0 && newY < n && !arr[newX][newY] && k >= sum(newX, newY)) {
            moving(m, n, k, arr, newX, newY);
        }
    }
}

function sum(x: number, y: number): number {
    const str = String(x) + String(y);
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i]);
    }
    return sum;
}