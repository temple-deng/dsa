/**
 * @file 319. 灯泡开关
 * @link https://leetcode-cn.com/problems/bulb-switcher/
 */

export function bulbSwitch(n: number): number {
    // 假设 1 代表亮着，0代表暗着
    const lights = new Array(n);
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    for (let i = 0; i < n; i++) {
        lights[i] = 1;
    }
    for (let sz = 2; sz < n; sz++) {
        for (let i = 1; i * sz - 1 < n;i++) {
            if (lights[i * sz - 1]) {
                lights[i * sz - 1] = 0;
            } else {
                lights[i * sz - 1] = 1;
            }
        }
    }

    return lights.find(i => i === 1).length;
};