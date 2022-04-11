function shortestCompletingWord(licensePlate: string, words: string[]): string {
    const map = new Map<string ,number>();
    let len = 0;

    for (let i = 0; i < licensePlate.length; i++) {
        const char = licensePlate[i];
        if (isNaN(Number(char))) {
            const lowerCase = char.toLowerCase();
            if (map.has(lowerCase)) {
                map.set(lowerCase, map.get(lowerCase)! + 1);
            } else {
                map.set(lowerCase, 1);
            }
            len++;
        }
    }

    const res: string[] = [];
    let minLen = Infinity;

    for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if (w.length >= len) {
            const copyMap = new Map(map);
            for (let j = 0; j < w.length; j++) {
                const c = w[j];
                if (copyMap.has(c)) {
                    copyMap.set(c, copyMap.get(c)! - 1);
                    if (copyMap.get(c) === 0) {
                        copyMap.delete(c);
                    }
                }
            }
            if (copyMap.size === 0) {
                res.push(w);
                minLen = Math.min(minLen, w.length);
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        if (res[i].length === minLen) {
            return res[i];
        }
    }

    return '';
};