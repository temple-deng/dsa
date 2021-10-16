interface LinkNode<T> {
    e: T | undefined;
    next: LinkNode<T> | null;
    new (e?: T, next?: LinkNode<T>): LinkNode<T>;
}

class LinkNode<T> implements LinkNode<T> {
    e: T | undefined;
    next: LinkNode<T> | null;

    constructor(e?: T | undefined, next?: LinkNode<T> | null) {
        this.e = e;
        this.next = next || null;
    }
}

export default class LinkedList<T> {
    dummyHead = new LinkNode<T>(undefined, null);
    size = 0;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    add(index: number, e: T) {
        if (index < 0 || index > this.size) {
            throw new Error('error');
        }

        let prev = this.dummyHead;
        for (let i = 0; i < index; i++) {
            prev = prev.next as LinkNode<T>;
        }
        prev.next = new LinkNode(e, prev.next);
        this.size++;
    }

    addFirst(e: T) {
        this.add(0, e);
    }

    addLast(e: T) {
        this.add(this.size, e);
    }

    get(index: number): T | undefined {
        if (index < 0 || index >= this.size) {
            throw new Error('error');
        }

        let cur = this.dummyHead.next as LinkNode<T>;
        for (let i = 0; i < index; i++) {
            cur = cur.next as LinkNode<T>;
        }
        return cur.e;
    }

    getFirst() {
        return this.get(0);
    }

    getLast() {
        return this.get(this.size - 1);
    }

    set(index: number, e: T) {
        if (index < 0 || index >= this.size) {
            throw new Error('error');
        }

        let cur = this.dummyHead.next as LinkNode<T>;
        for (let i = 0; i < index; i++) {
            cur = cur.next as LinkNode<T>;
        }

        cur.e = e;
    }

    contains(e: T): boolean {
        let cur = this.dummyHead.next as LinkNode<T>;

        for (let i = 0; i < this.size + 1; i++) {
            if (cur.e === e) {
                return true;
            }
            cur = cur.next as LinkNode<T>;
        }
        return false;
    }

    delete(index: number): T | undefined {
        if (index < 0 || index >= this.size) {
            throw new Error('error');
        }

        let prev = this.dummyHead as LinkNode<T>;
        for (let i = 0; i < index; i++) {
            prev = prev.next as LinkNode<T>;
        }
        const cur = prev.next as LinkNode<T>;
        prev.next = cur.next;
        cur.next = null;
        this.size--;
        return cur.e;
    }

    deleteFirst() {
        return this.delete(0);
    }

    deleteLast() {
        return this.delete(this.size - 1);
    }

    removeElement(e: T) {
        let prev = this.dummyHead;
        while (prev.next !== null) {
            if (prev.next.e === e) {
                const node = prev.next;
                prev.next = node.next;
                node.next = null;
                this.size--;
                return;
            }
            prev = prev.next;
        }
    }
}

