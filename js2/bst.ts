import LinkedListStack from "./linkedListStack";
import LinkedListQueue from "./linkedListQueue";

class Node<T> {
    e: T;
    left: Node<T> | null = null;
    right: Node<T> | null = null;

    constructor(e: T) {
        this.e = e;
    }

    toString() {
        return this.e;
    }
}

export default class BST<T> {
    private root: Node<T> | null = null;
    private size = 0;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    add(e: T) {
        this.root = this.addSubtree(this.root, e);
    }

    private addSubtree(root: Node<T> | null, e: T): Node<T> {
        if (root === null) {
            this.size++;
            return new Node(e);
        }

        if (e < root.e) {
            root.left = this.addSubtree(root.left, e);
        } else if (e > root.e) {
            root.right = this.addSubtree(root.right, e);
        }
        return root;
    }

    contains(e: T): boolean {
        return this.containsSubtree(this.root, e);
    }

    private containsSubtree(root: Node<T> | null, e: T): boolean {
        if (root === null) {
            return false;
        }

        if (root.e === e) {
            return true;
        } else if (e < root.e) {
            return this.containsSubtree(root.left, e);
        } else {
            return this.containsSubtree(root.right, e);
        }
    }

    preOrder(cb: Function) {
        this.preOrderSubtree(this.root, cb);
    }

    private preOrderSubtree(root: Node<T> | null, cb: Function) {
        if (root === null) {
            return;
        }
        cb(root.e);
        this.preOrderSubtree(root.left, cb);
        this.preOrderSubtree(root.right, cb);
    }

    preOrderNR(cb: Function) {
        const stack = new LinkedListStack<Node<T>>();
        stack.push(this.root);
        while (!stack.isEmpty()) {
            const top = stack.pop();
            if (!top) {
                break;
            }
            cb(top.e);
            stack.push(top.right);
            stack.push(top.left);
        }
    }

    inOrder(cb: Function) {
        this.inOrderSubtree(this.root, cb);
    }

    private inOrderSubtree(root: Node<T> | null, cb: Function) {
        if (root === null) {
            return;
        }
        this.preOrderSubtree(root.left, cb);
        cb(root.e);
        this.preOrderSubtree(root.right, cb);
    }

    postOrder(cb: Function) {
        this.postOrderSubtree(this.root, cb);
    }

    private postOrderSubtree(root: Node<T> | null, cb: Function) {
        if (root === null) {
            return;
        }
        this.preOrderSubtree(root.left, cb);
        this.preOrderSubtree(root.right, cb);
        cb(root.e);
    }

    levelOrder(cb: Function) {
        const queue = new LinkedListQueue<Node<T>>();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            const front = queue.dequeue();
            if (!front) {
                break;
            }
            cb(front.e);
            queue.enqueue(front.left);
            queue.enqueue(front.right);
        }
    }

    minimum(): T {
        if (this.root === null) {
            throw new Error('error');
        }
        return this.minimumSubtree(this.root).e;
    }

    private minimumSubtree(node: Node<T>): Node<T> {
        if (node.left) {
            return this.minimumSubtree(node.left);
        }
        return node;
    }

    maximum(): T {
        if (this.root === null) {
            throw new Error('error');
        }
        return this.maximumSubtree(this.root).e;
    }

    private maximumSubtree(node: Node<T>): Node<T> {
        if (node.right) {
            return this.maximumSubtree(node.right);
        }
        return node;
    }

    removeMin(): T {
        const ret = this.minimum();
        this.root = this.removeMinSubtree(this.root as Node<T>);
        return ret;
    }

    private removeMinSubtree(node: Node<T>) {
        if (node.left === null) {
            this.size--;
            const right = node.right;
            node.right = null;
            return right;
        } else {
            node.left = this.removeMinSubtree(node.left);
            return node;
        }
    }

    removeMax(): T {
        const ret = this.maximum();
        this.root = this.removeMaxSubtree(this.root as Node<T>);
        return ret;
    }

    private removeMaxSubtree(node: Node<T>) {
        if (node.right === null) {
            this.size--;
            const left = node.left;
            node.left = null;
            return left;
        } else {
            node.right = this.removeMaxSubtree(node.right);
            return node;
        }
    }

    remove(e: T) {
        if (!this.contains(e)) {
            throw new Error();
        }

        this.root = this.removeSubtree(this.root as Node<T>, e);
    }

    private removeSubtree(node: Node<T>, e: T): Node<T> | null {
        if (node.e === e) {
            if (node.left === null) {
                const right = node.right;
                node.right = null;
                this.size--;
                return right;
            } else if (node.right === null) {
                const left = node.left;
                node.left = null;
                this.size--;
                return left;
            } else {
                const successor = this.minimumSubtree(node.right);
                successor.right = this.removeMinSubtree(node.right);
                successor.left = node.left;  // 这一这里必须放后面
                node.left = node.right = null;
                return successor;
            }
        } else if (e < node.e) {
            node.left = this.removeSubtree(node.left as Node<T>, e);
        } else {
            node.right = this.removeSubtree(node.right as Node<T>, e);
        }
        return node;
    }
}