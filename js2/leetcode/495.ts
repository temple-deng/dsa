/**
 * @file 495. 提莫攻击
 * @link https://leetcode-cn.com/problems/teemo-attacking/
 */

export function findPoisonedDuration(timeSeries: number[], duration: number): number {
    let res = 0;
    const len = timeSeries.length;

    // res 存放的 [0, i - 1) 的中毒时间
    for (let i = 1; i < len; i++) {
        const time = timeSeries[i] - timeSeries[i - 1];
        res += Math.min(time, duration);
    }

    return res + duration;
};