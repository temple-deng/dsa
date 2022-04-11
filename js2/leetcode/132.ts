export {}

// 事实证明，这种方案是可行的，但是时间复杂度太高了
function minCut(s: string): number {
    if (s.length <= 1) {
        return 0;
    }

    let dp = new Array(s.length + 1);
    const set = new Set<string>();
    dp[0] = 0;
    dp[1] = 0;

    // dp[i] 代表前 i 个字符可以进行的最小划分
    // 则最后一步就是将字符串分成 [0, i - 1], [i, n - 1] 的划分
    // dp[i] = min{k 从 0 ~ i - 1, dp[k] + 1 | s[k, i - 1] 是一个回文串}
    // 这里我们假设切割点在字符 k 的前面

    // 我们肯定要找个快捷的方法记录一个字符串是不是回文串，以及不是回文串需要多少次划分，不然要浪费
    // 太多的时间去处理
    // 但如何记录呢

    for (let i = 2; i < dp.length; i++) {
        let min = Infinity;

        for (let j = 0; j < i; j++) {
            if (isPal(s, j, i - 1, set)) {
                min = Math.min(min, j === 0 ? dp[j] : dp[j] + 1);
            }
        }

        dp[i] = min;
    }

    return dp.pop();
};

function isPal(s: string, start: number, end: number, set: Set<string>): boolean {
    const subStr = s.slice(start, end + 1);
    if (set.has(subStr)) {
        return true;
    }
    while (start < end) {
        if (s[start] !== s[end]) {
            return false;
        } else {
            start++;
            end--;
        }
    }

    set.add(subStr);

    return true;
}


// 时间复杂度高的一方面原因是，对于非回文串，我们每次都要遍历一次，才知道他不是回文串，有太多的遍历，
// 这里可以优化一般，继续用一个set
// 然而事实上加了一个非回文串的 set 后，时间复杂度反而继续增高了，而且空间复杂度也高了


function minCut2(s: string): number {
    if (s.length <= 1) {
        return 0;
    }

    let dp = new Array(s.length + 1);
    const set = new Set<string>();
    dp[0] = 0;
    dp[1] = 0;

    const isPal = getPalArr(s);

    for (let i = 2; i < dp.length; i++) {
        let min = Infinity;
        for (let j = 0; j < i; j++) {
            if (isPal[j][i - 1]) {
                min = Math.min(min, dp[j] + 1);
            }
        }

        dp[i] = min;
    }

    return dp.pop() - 1;
}

function getPalArr(s: string) {
    let arr: boolean[][] = new Array(s.length);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(s.length);
    }

    for (let i = 0; i < s.length; i++) {
        arr[i][i] = true;
        let l = i - 1;
        let r = i + 1;

        while (l >= 0 && r < s.length) {
            if (s[l] === s[r]) {
                arr[l][r] = true;
                l--;
                r++;
            } else {
                arr[l][r] = false;
                break;
            }
        }
    }

    for (let i = 0; i < s.length; i++) {
        let l = i;
        let r = i + 1;
        while (l >= 0 && r < s.length) {
            if (s[l] === s[r]) {
                arr[l][r] = true;
                l--;
                r++;
            } else {
                arr[l][r] = false;
                break;
            }
        }
    }

    return arr;
}