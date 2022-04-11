export {}

function isHappy(n: number): boolean {
    if (n === 1) {
        return true;
    }
    let str = n.toString();
    const set = new Set();
    while (true) {
        if (set.has(str)) {
            return false;
        }
        set.add(str);
        let num = 0;
        for (let char of str) {
            num += Math.pow(Number(char), 2);
        }
        if (num === 1) {
            return true;
        }
        str = num.toString();
    }
};