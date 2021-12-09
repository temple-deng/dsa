/**
 * @file 994. 腐烂的橘子
 * @link https://leetcode-cn.com/problems/rotting-oranges/
 */

let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

export function orangesRotting(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const visited: boolean[][] = [];
    let freshNum = 0;

    const q = [];

    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                freshNum++;
            } else if (grid[i][j]) {
                visited[i][j] = true;

                q.push({
                    depth: 0,
                    node: [i, j],
                });
                freshNum++;
            }
        }
    }

    if (freshNum === 0) {
        return 0;
    }

    let prevNode = null;
    while (q.length) {
        const front: {
            depth: number,
            node: number[]
        } = q.shift()!;
        const [i, j] = front.node;
        freshNum--;
        for (let k = 0; k < dir.length; k++) {
            const [dx, dy] = dir[k];
            const [x, y] = [dx + i, dy + j];
            if (x >= 0 && y >= 0 && x < m && y < n && !visited[x][y] && grid[x][y]) {
                visited[x][y] = true;
                q.push({
                    depth: front.depth + 1,
                    node: [x, y]
                });
            }
        }
        prevNode = front;
    }

    if (freshNum) {
        return -1;
    }

    return prevNode!.depth;
};