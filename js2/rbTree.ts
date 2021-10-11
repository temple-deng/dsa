import LinkedListStack from "./linkedListStack";
import LinkedListQueue from "./linkedListQueue";

class Node<T> {
    e: T;
    isRed: boolean = true;
    left: Node<T> | null = null;
    right: Node<T> | null = null;

    constructor(e: T) {
        this.e = e;
    }

    toString() {
        return this.e;
    }
}

export default class RBTree<T> {
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
        this.root.isRed = false;
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

        if (this.isRed(root.right) && !this.isRed(root.left)) {
            root = this.leftRotate(root);
        }
        if (this.isRed(root.left) && this.isRed(root.left!.left)) {
            root = this.rightRotate(root);
        }
        if (this.isRed(root.left) && this.isRed(root.right)) {
            this.flipColors(root);
        }
        return root;
    }

    // 2-3 树，向 2 节点右侧插入节点，即红黑树，向1个黑节点右侧插入节点
    private leftRotate(node: Node<T>): Node<T> {
        const rightNode = node.right
        node.right = rightNode!.left;

        // 这里的颜色确实不好理解，原本 node 理应是黑色的吧，那 rightNode 直接赋黑色不行吗
        // node 然后改成红色可以理解，应为是 3 节点的左侧节点
        rightNode!.left = node;
        rightNode!.isRed = node.isRed;
        node.isRed = true;
        return rightNode!;
    }

    // 向 3 节点左侧添加节点，整个树需要右旋
    private rightRotate(node: Node<T>): Node<T> {
        const leftNode = node.left;
        node.left = leftNode!.right;
        leftNode!.right = node;

        // 仍然是这里颜色部分，无法理解，看情况，感觉是旋转，并不表示节点的上浮
        // 仅仅表示一个 2节点或3节点内部的扭动，而 flipColors 才是节点上浮的操作
        leftNode!.isRed = node.isRed;
        node.isRed = true;
        return leftNode!;
    }

    // 向3节点右侧添加节点，以及向3节点左侧添加元素旋转后，将节点上浮，变色就是表示上浮的过程
    // 子节点变黑，节点变红
    private flipColors(node: Node<T>) {
        node.isRed = true;
        node.left!.isRed = false;
        node.right!.isRed = false;
    }

    private isRed(node: Node<T> | null) {
        if (node === null) {
            return false;
        }
        return node.isRed;
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
        if (this.root) {
            const stack = new LinkedListStack<Node<T>>();
            stack.push(this.root);
            while (!stack.isEmpty()) {
                const top = stack.pop();
                if (!top) {
                    break;
                }
                cb(top.e);
                top.right && stack.push(top.right);
                top.left && stack.push(top.left);
            }
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
        if (this.root) {
            const queue = new LinkedListQueue<Node<T>>();
            queue.enqueue(this.root);
            while (!queue.isEmpty()) {
                const front = queue.dequeue();
                if (!front) {
                    break;
                }
                cb(front.e);
                front.left && queue.enqueue(front.left);
                front.right && queue.enqueue(front.right);
            }
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
                const successor = this.minimumSubtree(node);
                successor.left = node.left;
                successor.right = this.removeMinSubtree(node.right);
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