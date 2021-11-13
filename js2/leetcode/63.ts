/**
 * @file 
 */

export function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const paths: number[][] = [];

    paths[0][0] = obstacleGrid[0][0] ? 0 : 1;
    for (let i = 1; i < m ; i++) {
        paths[i] = new Array(n);
        paths[i][0] = (obstacleGrid[i][0] || !paths[i - 1][0]) ? 0 : 1;
    }

    for (let j = 1; j < n; j++) {
        paths[0][j] = (obstacleGrid[0][j] || !paths[0][j - 1]) ? 0 : 1;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j]) {
                paths[i][j] = 0;
            } else {
                paths[i][j] = paths[i - 1][j] + paths[i][j - 1];
            }
        }
    }

    return paths[m - 1][n - 1];
};