/**
 * 
 */

export {}

function leastInterval(tasks: string[], n: number): number {
    // 最值问题，可能是动态规划
    // 这也不是普通的动态规划啊
    const map = new Map<string, number>();

    for (let i = 0; i < tasks.length; i++) {
        if (map.has(tasks[i])) {
            map.set(tasks[i], map.get(tasks[i])! + 1);
        } else {
            map.set(tasks[i], 1);
        }
    }

    // 这种情况下，以最多的任务罗列开
    const res = [];
    for (const [key, value] of map.entries()) {

    }
};