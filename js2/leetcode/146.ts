class LinkNode {
    key: number;
    prev: LinkNode | null;
    next: LinkNode | null;
    constructor(key: number, prev?: LinkNode, next?: LinkNode) {
        this.key = key;
        this.prev = prev || null;
        this.next = next || null;
    }
}

class CacheNode {
    val: number;
    node: LinkNode;

    constructor(val: number, node: LinkNode) {
        this.val = val;
        this.node = node;
    }
}

class LRUCache {
    map = new Map<number, CacheNode>();
    capacity = 0;
    head = new LinkNode(0);
    tail: null | LinkNode = null;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: number): number {
        if (this.map.has(key)) {
            // update linked list
            const mapValue = this.map.get(key)!;

            return mapValue.val;
        }
        return -1;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            const mapValue = this.map.get(key)!;
            mapValue.val = value;
            // update linked list
            return;
        }

        if (this.map.size === this.capacity) {
            this.deleteOldNode();
        }

        this.map.set(key, {
            val: value,
            node: new LinkNode(key)
        });
        const next = this.head.next;
        
    }

    deleteOldNode() {
        // 假设末尾的节点是最老的
        const {tail} = this;
        const {key, prev} = tail as LinkNode;
        this.tail = prev;
        prev!.next = null;
        tail!.prev = null;
        this.map.delete(key);
    }
}




export {}