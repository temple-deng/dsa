/**
 * @file 127 单词接龙
 * @link https://leetcode-cn.com/problems/word-ladder/
 */

// 超时了，不会做了
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    if (wordList.indexOf(endWord) === -1) {
        return 0;
    }

    const queue = [{
        word: beginWord,
        step: 1,
    }];
    const visited = new Map();

    while (queue.length) {
        const {word, step} = queue.shift()!;
        visited.set(word, 1);

        for (let i = 0; i < wordList.length; i++) {
            const curWord = wordList[i];
            if (!visited.has(curWord)) {
                let diff = 0;
                for (let j = 0; j < curWord.length; j++) {
                    if (curWord[j] !== word[j]) {
                        diff++;
                    }
                    if (diff > 1) {
                        break;
                    }
                }

                // 到当前单词找到一条合法路径
                if (diff === 1) {
                    if (curWord === endWord) {
                        return step + 1;
                    } else {
                        queue.push({
                            word: curWord,
                            step: step + 1,
                        });
                    }
                }
            }
        }
    }

    return 0;
};