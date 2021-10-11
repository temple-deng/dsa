class Node {
    isWord: boolean;
    next: Map<string, Node>;

    constructor(isWord: boolean = false) {
        this.isWord = isWord;
        this.next = new Map<string, Node>();
    }
}
export default class Trie {
    root = new Node(false);
    size = 0;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    add(word: string) {
        let cur = this.root;
        for (let i = 0, len = word.length; i < len; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                cur.next.set(char, new Node());
            }
            cur = cur.next.get(char) as Node;
        }
        if (!cur.isWord) {
            cur.isWord = true;
            this.size++;
        }
    }

    contains(word: string): boolean {
        let cur = this.root;
        for (let i = 0, len = word.length; i < len; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                return false;
            }
            cur = cur.next.get(char) as Node;
        }
        return cur.isWord;
    }
}