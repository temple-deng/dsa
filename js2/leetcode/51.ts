/**
 * @file 51 N皇后问题
 * @link https://leetcode-cn.com/problems/n-queens/
 * @description 开心，这是自己看了视频就会的
 */


let ret:string[][] = [];
let col: number[] = []; // col[i] = 1 代表第 i 列摆放了一个皇后
let dia1: number[] = [];  // 45deg对角线 dia1[i] 表示第 i 条 45deg 对角线上有一个 queen, i 从左上角到右下角, i = x + y
let dia2: number[] = []   // 135deg对角线 dia2[i] 表示第 i 条 135deg 对角线上一个 queen，i 从右上角到左下角 i = x - y + n - 1

export function solveNQueens(n: number): string[][] {
    solve(n, []);

    ret = [];
    col = []; // col[i] = 1 代表第 i 列摆放了一个皇后
    dia1 = [];  // 45deg对角线 dia1[i] 表示第 i 条 45deg 对角线上有一个 queen, i 从左上角到右下角, i = x + y
    dia2 = [] 
    return ret;
};

/**
 * 尝试在 res.length 行搜索一个 n 皇后问题的一个皇后位置
 * @param n 
 * @param res 目前已摆放的皇后位置 1 代表摆放了 1 个皇后
 */
function solve(n: number, res: number[][]) {
    if (n === res.length) {
        addRes(res);
    }

    // 这里应该不是从 0 起始，应该是从下一行开始
    // 检查当前行是否有合理的位置

    // 这里一定要注意，这里只处理当前行的情况就好了，不要遍历
    let i = res.length;
    // 每一行的时候检查一行中的所有列是否可以放置一个 queen
    for (let j = 0; j < n; j++) {
        if (!col[j] && !dia1[i + j] && !dia2[i - j + n - 1]) {
            // 找到了当前行的一个合理位置
            col[j] = dia1[i + j] = dia2[i - j + n -1] = 1;
            const arr: number[] = new Array(n);
            arr[j] = 1;
            res.push(arr);
            // 这一行找到一个位置
            solve(n, res);
            col[j] = dia1[i + j] = dia2[i - j + n -1] = 0;
            res.pop();
        }
    }
}

// 将一个数字表示的 array 转换成要求的字符串 array，并添加到解集中
function addRes(res: number[][]): void {
    const arr: string[] = [];
    for (let i = 0; i < res.length; i++) {
        let str = '';
        for (let j = 0; j < res[0].length; j++) {
            if (res[i][j]) {
                str += 'Q';
            } else {
                str += '.';
            }
        }
        arr.push(str);
    }
    ret.push(arr);
}