/**
 * @file 11. 盛最多水的容器
 * @link https://leetcode-cn.com/problems/container-with-most-water/
 * @description 对撞指针的解法，难点在于，遍历一对点后，如何更新指针
 * 对撞指针是相互接近的，那宽度就是减少的，要想增加面积，则必须增加高度
 * 而高度又是依赖于两个高度较小的那一个，所以每次更新的时候，更新高度较小的那一个
 */

export function maxArea(height: number[]): number {
    let max = 0;

    let l = 0;
    let r = height.length - 1;

    while (l < r) {
        const area = (r - l) * Math.min(height[l], height[r]);
        if (area > max) {
            max = area;
        }

        if (height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
    }

    return max;
};