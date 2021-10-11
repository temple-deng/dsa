import type {Map} from './map';

class Node<K, V> {
    key: K;
    val: V;
    next: Node<K, V> | null;

    constructor(key: K, val: V, next: Node<K, V> | null) {
        this.key  = key;
        this.val = val;
        this.next = next || null;
    }
}

export default class LinkedListMap<K, V> implements Map<K, V> {
    private dummyHead: { next: Node<K, V> | null} = { next: null };
    private size = 0;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    getNode(key: K): Node<K, V> | null {
        let cur = this.dummyHead.next;
        while (cur !== null) {
            if (key === cur.key) {
                return cur;
            }
            cur = cur.next;
        }
        return null;
    }

    add(key: K, val: V) {
        const node = this.getNode(key);
        if (node !== null) {
            node.val = val;
        } else {
            this.dummyHead.next = new Node(key, val, this.dummyHead.next);
            this.size++;
        }
    }

    remove(key: K): V | null {
        let prev = this.dummyHead;
        while (prev !== null && prev.next != null) {
            if (prev.next.key === key) {
                const node = prev.next;
                prev.next = node.next;
                node.next = null;
                this.size--;
                return node.val;
            }
            prev = prev.next;
        }
        return null;
    }

    contains(key: K): boolean {
        return this.getNode(key) !== null;
    }

    get(key: K): V | null {
        const node = this.getNode(key);
        if (node === null) {
            return null;
        }
        return node.val;
    }

    set(key: K, val: V) {
        const node = this.getNode(key);
        if (node === null) {
            throw new Error();
        }
        node.val = val;
    }
}