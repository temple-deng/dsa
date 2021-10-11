/**
 * @file 实现 trie
 * @link https://leetcode-cn.com/problems/implement-trie-prefix-tree/
 */

class TrieNode {
    isWord: boolean;
    next: Map<string, TrieNode>;

    constructor(isWord = false) {
        this.isWord = isWord;
        this.next = new Map();
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
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
        let cur = this.root;
        for (let i = 0, len = word.length; i < len; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                return false
            }
            cur = cur.next.get(char) as TrieNode;
        }
        return cur.isWord;
    }

    startsWith(prefix: string): boolean {
        let cur = this.root;
        for (let i = 0, len = prefix.length; i < len; i++) {
            const char = prefix[i];
            if (!cur.next.has(char)) {
                return false
            }
            cur = cur.next.get(char) as TrieNode;
        }
        return true;
    }
}
