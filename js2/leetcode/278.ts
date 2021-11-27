/**
 * @file 278. 第一个错误的版本
 * @link https://leetcode-cn.com/problems/first-bad-version/
 * @description 这应该是一个类似寻找上下界的问题
 */

export var solution = function(isBadVersion: any) {

    return function(n: number): number {
        let l = 1;
        let r = n;
        while (l <= r) {
            const mid = Math.floor((r - l) / 2) + l;
            if (isBadVersion(mid)) {
                if (isBadVersion(mid - 1)) {
                    r = mid - 1;
                } else {
                    return mid;
                }
            } else {
                l = mid + 1;
            }
        }
        return -1;
    };
};