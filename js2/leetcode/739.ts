/**
 * 
 */

export {}
// [73,74,75,71,69,72,76,73]

function dailyTemperatures(temperatures: number[]): number[] {
    let res = new Array(temperatures.length).fill(0);

    for (let i = temperatures.length - 2; i >= 0; i--) {
        for (let j = i + 1; j < temperatures.length; j++) {
            if (temperatures[j] > temperatures[i]) {
                res[i] = j - i;
                break;
            }
        }
    }

    return res;
};
