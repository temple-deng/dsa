export {}


function findMinDifference(timePoints: string[]): number {
    let arr = [];

    // 有个问题，最小时间差怎么确定，
    // 首先统一转成分钟计数
    for (let i = 0; i < timePoints.length; i++) {
        const t = timePoints[i];
        const [h, m] = t.split(':');
        let mins = Number(h) * 60 + Number(m);
        arr.push(mins);
    }

    arr.sort((a, b) => a - b);

    let min = Infinity;
    // OK，现在排好序了
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        if (diff === 0) {
            return 0;
        }
        min = Math.min(min, diff);
    }

    min = Math.min(arr[0] + 24 * 60 - arr[arr.length - 1], min);
    return min;
};