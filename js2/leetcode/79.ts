/**
 * @file 79. 单词搜索
 * @linkhttps://leetcode-cn.com/problems/word-search/
 * @description 始终不理解我的算法慢在哪里
 */ 

let m: number;
let n: number;
export function exist(board: string[][], word: string): boolean {
    m = board.length;
    n = board[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (searchWord(board, word, 0, i, j)) {
                return true;
            }
        }
    }
    return false;
};

const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const set = new Set();

function searchWord(board: string[][], word: string, index: number, startX: number, startY: number): boolean {
    // 找到了最后一个字母
    const char = board[startX][startY];
    if (word.length - 1 === index) {
        return char === word[index];
    }

    // 否则这时候要干嘛，这个元素和要找的字母不匹配
    if (char !== word[index]) {
        return false;
    }

    // 这时候，当前字母是匹配的，就看后面的了
    let res = false;
    set.add(`${startX}-${startY}`);
    for (let i = 0; i < dir.length; i++) {
        const d = dir[i];
        const nextX = startX + d[0];
        const nextY = startY + d[1];
        const key = `${nextX}-${nextY}`;
        if (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n && !set.has(key)) {
            res = res || searchWord(board, word, index + 1, nextX, nextY);
        }
        if (res) {
            break;
        }
    }
    set.delete(`${startX}-${startY}`);

    return res;
}