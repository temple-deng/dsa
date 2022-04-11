// 这是个典型的递归回溯吧，甚至都没有用到，只是简单遍历
export class Solution {

    /**
     * maxKilledEnemies
     *
     * @param grid: Given a 2D grid, each cell is either 'W', 'E' or '0'
     * @return: an integer, the maximum enemies you can kill using one bomb
     */
    maxKilledEnemies(grid: string[]) {
      // Write your code here

        if (grid.length === 0) {
            return 0;
        }
        let max = 0;
        const m = grid.length;
        const n = grid[0].length;

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '0') {
                    let num = 0;

                    // 上
                    for (let k = i - 1; k >= 0; k--) {
                        if (grid[k][j] === 'W') {
                            break;
                        } else if (grid[k][j] === 'E') {
                            num++;
                        }
                    }

                    // 右
                    for (let k = j + 1; k < n; k++) {
                        if (grid[i][k] === 'W') {
                            break;
                        } else if (grid[i][k] === 'E') {
                            num++;
                        }
                    }

                    // 下
                    for (let k = i + 1; k < m; k++) {
                        if (grid[k][j] === 'W') {
                            break;
                        } else if (grid[k][j] === 'E') {
                            num++;
                        }
                    }

                    // 左
                    for (let k = j - 1; k >= 0; k--) {
                        if (grid[i][k] === 'W') {
                            break;
                        } else if (grid[i][k] === 'E') {
                            num++;
                        }
                    }

                    max = Math.max(0, num);
                }
            }
        }

        return max;
    }

    maxKilledEnemies2(grid: string[]) {
        if (!grid.length) {
            return 0;
        }
        const m = grid.length;
        const n = grid[0].length;

        let up = new Array(m);
        let right = new Array(m);
        let down = new Array(m);
        let end = new Array(m);
        // 动态规划这种，初始化就很麻烦啊

        for (let i = 0; i < m; i++) {
            up[i] = new Array(n);
            right[i] = new Array(n);
            down[i] = new Array(n);
            end[i] = new Array(n);
        }
    }

}

