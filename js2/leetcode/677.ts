/**
 * @file 677 键值映射
 * @link https://leetcode-cn.com/problems/map-sum-pairs/
 */

export class TrieNode {
    num: number;
    next: Map<string, TrieNode>;

    constructor(num = 0) {
        this.num = num;
        this.next = new Map();
    }
}

class MapSum {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(key: string, val: number): void {
        let cur = this.root;
        for (let i = 0, len = key.length; i < len; i++) {
            const char = key[i];
            if (!cur.next.has(char)) {
                cur.next.set(char, new TrieNode());
            }
            cur = cur.next.get(char) as TrieNode;
        }
        cur.num = val;
    }

    sum(prefix: string): number {
        let cur = this.root;
        for (let i = 0, len = prefix.length; i < len; i++) {
            const char = prefix[i];
            if (!cur.next.has(char)) {
                return 0;
            }
            cur = cur.next.get(char) as TrieNode;
        }
        return this.sumSubtree(cur);
    }

    sumSubtree(root: TrieNode): number {
        let sum = root.num;
        root.next.forEach(node => {
            sum += this.sumSubtree(node);
        });
        return sum;
    }
}
