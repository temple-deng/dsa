/**
 * @file 391. 完美矩形
 * @link https://leetcode-cn.com/problems/perfect-rectangle/
 * @description 想用面积投机取巧，但是发现有一种情况是，重叠的面积刚好是缺少的面积
 */

// wrong
export function isRectangleCover(rectangles: number[][]): boolean {
    let minX: number = Infinity;
    let minY: number = Infinity;
    let maxA: number = -Infinity;
    let maxB: number = -Infinity;

    let area = 0;

    for (let i = 0; i < rectangles.length; i++) {
        const [x, y, a, b] = rectangles[i];
        area += (a - x) * (b - y);
        if (x <= minX && y <= minY) {
            minX = x;
            minY = y;
        }
        if (a >= maxA && b >= maxB) {
            maxA = a;
            maxB = b;
        }
    }

    if (area === (maxA - minX) * (maxB - minY)) {
        return true;
    }

    return false;
};