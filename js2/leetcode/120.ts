/**
 * @file 120. 三角形最小路径和
 * @link https://leetcode-cn.com/problems/triangle/
 */

export function minimumTotal(triangle: number[][]): number {
    // 自底向上的不会，试试自顶向下的
    const totals = [[triangle[0][0]]];

    for (let i = 1; i < triangle.length; i++) {
        totals[i] = new Array(triangle[i].length);
        const levelUp = totals[i - 1];
        for (let j = 0; j < totals[i].length; j++) {
            totals[i][j] = Math.min(levelUp[Math.min(j, levelUp.length - 1)], levelUp[Math.max(j - 1, 0)]) + triangle[i][j];
        }
    }

    const m = triangle.length;
    return Math.min.apply(null, totals[m - 1]);
};
