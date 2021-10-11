/**
 * @file 211 添加与搜索单词 - 数据结构设计
 * @link https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/
 */

export class TrieNode {
    isWord: boolean;
    next: Map<string, TrieNode>;

    constructor(isWord = false) {
        this.isWord = isWord;
        this.next = new Map();
    }
}

class WordDictionary {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let cur = this.root;
        for (let i = 0, len = word.length; i < len; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                cur.next.set(char, new TrieNode());
            }
            cur = cur.next.get(char) as TrieNode;
        }
        cur.isWord = true;
    }

    search(word: string): boolean {
        return this.searchTrie(this.root, word);
    }

    searchTrie(root: TrieNode, word: string): boolean {
        let cur = root;
        for (let i = 0, len = word.length; i < len; i++) {
            const char = word[i];
            if (char === '.') {
                if (cur.next.size) {
                    let had = false;
                    cur.next.forEach(node => {
                        const res = this.searchTrie(node, word.slice(i + 1));
                        if (res) {
                            had = true;
                        }
                    });
                    return had;
                } else {
                    return false;
                }
            } else if (!cur.next.has(char)) {
                return false
            }
            cur = cur.next.get(char) as TrieNode;
        }
        return cur.isWord;
    }
}