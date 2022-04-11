/**
 * 
 */
export {}

function maxScoreSightseeingPair(values: number[]): number {
    const memo = [values[0]];

    for (let i = 1; i < values.length; i++) {
        memo[i] = Math.max(memo[i - 1], values[i] + i);
    }

    let memo2 = [0];
    for (let i = 1; i < values.length; i++) {
        memo2[i] = memo[i - 1] + values[i] - i;
    }

    return Math.max(...memo2);
};

function maxProfit(prices: number[]): number {
    let minBuyPrice = prices[0];

    let memo = [0];

    for (let i = 1; i < prices.length; i++) {
        memo[i] = Math.max(memo[i - 1], prices[i] - minBuyPrice);
        minBuyPrice = Math.min(minBuyPrice, prices[i]);
    }

    return Math.max(...memo);
};