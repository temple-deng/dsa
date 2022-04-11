/**
 * 
 */

export {}

let memo: number[][] = [];

function minDistance(word1: string, word2: string): number {
    // 遍历 word2

    // 这里不要乱初始化
    // 那我们有没有自底向上的方案呢
    for (let i = 0; i < word1.length; i++) {
        memo[i] = new Array(word2.length);
    }

    return findDis(word1, word2, 0, 0);
    // 那可能方案是可行的，那就是要添加记忆话搜索的功能
};

// 搜索 word1.slice(word1Index) 到 word2.slice(word2Index) 最少需要几步转换
// horse ros
function findDis(word1: string, word2: string, word1Index: number, word2Index: number): number {
    if (word2Index === word2.length) {
        return word1.slice(word1Index).length;
    }

    if (word1Index === word1.length) {
        return word2.slice(word2Index).length;
    }

    if (word1[word1Index] === word2[word2Index]) {
        return findDis(word1, word2, word1Index + 1, word2Index + 1);
    }

    if (memo[word1Index][word2Index]) {
        return memo[word1Index][word2Index];
    }

    let min = Infinity;
    // 添加一个字符
    min = Math.min(min, 1 + findDis(word1, word2, word1Index, word2Index + 1));
    // 修改一个字符串
    min = Math.min(min, 1 + findDis(word1, word2, word1Index + 1, word2Index + 1));
    // 删除一个字符串
    min = Math.min(min, 1 + findDis(word1, word2, word1Index + 1, word2Index));
    memo[word1Index][word2Index] = min;
    return min;
}