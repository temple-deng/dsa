/**
 * @file 56. 合并区间
 * @link https://leetcode-cn.com/problems/merge-intervals/
 */

export function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => {
        const [as, ae] = a;
        const [bs, be] = b;
        if (as !== bs) {
            return as - bs;
        }
        return ae - be;
    });

    const ret: number[][] = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const rect = intervals[i];
        const top = ret[ret.length - 1];
        // 重叠了
        if (rect[0] <= top[1]) {
            // 这是个陷阱
            top[1] = Math.max(rect[1], top[1]);
        } else {
            ret.push(rect);
        }
    }

    return ret;
}