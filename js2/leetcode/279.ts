export {}

function numSquares(n: number): number {
    // 最后一步，n - x 加上一个完美平方数 x 后成了 n
    // 但是这里 x 的取值可能有多种，最大应该是根号 n，
    // dp[i] = 构成当前这个数，需要的最少平方数个数
    // dp[i] = i 从 0 到 根号 n

    if (n <= 1) {
        return 1;
    }

    const dp: number[] = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        let min = i;
        for (let j = 1; j <= i; j++) {
            if (i - j * j >= 0) {
                min = Math.min(min, dp[i - j * j] + 1);
            } else {
                break;
            }
        }

        dp[i] = min;
    }

    return dp.pop()!;
};
