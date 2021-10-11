class Node<K, V> {
    key: K;
    val: V;
    height = 1;
    left: Node<K, V> | null = null;
    right: Node<K, V> | null = null;

    constructor(key: K, val: V) {
        this.key = key;
        this.val = val;
    }
}
export default class AVLTree<K, V> {
    private root: Node<K, V> | null = null;
    private size = 0;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    isBST() {
        const arr: K[] = [];
        this.inOrder((key: K) => {
            arr.push(key);
        });
        for (let i = 1, len = arr.length; i < len; i++) {
            if (arr[i - 1] >= arr[i]) {
                return false;
            }
        }
        return true;
    }

    isBalanced(): boolean {
        return this.isBalancedSubtree(this.root);
    }

    private isBalancedSubtree(node: Node<K, V> | null): boolean {
        if (node === null) {
            return true;
        }
        return Math.abs(this.getBalanceFactor(node)) <= 1 && this.isBalancedSubtree(node.left)
            && this.isBalancedSubtree(node.right);
    }

    inOrder(cb: Function) {
        this.inOrderSubtree(this.root, cb);
    }

    private inOrderSubtree(node: Node<K, V> | null, cb: Function) {
        if (node === null) {
            return;
        }
        this.inOrderSubtree(node.left, cb);
        cb(node.key);
        this.inOrderSubtree(node.right, cb);
    }

    private getHeight(node: Node<K, V> | null): number {
        if (!node) {
            return 0;
        }
        return node.height;
    }
    
    private getBalanceFactor(node: Node<K, V> | null): number {
        if (node === null) {
            return 0;
        }
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    add(key: K, val: V) {
        this.root = this.addSubtree(this.root, key, val);
    }

    private addSubtree(node: Node<K, V> | null, key: K, val: V): Node<K, V> {
        if (node === null) {
            node = new Node(key, val);
            this.size++;
            return node;
        }

        if (key < node.key) {
            node.left = this.addSubtree(node.left, key, val);
            node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        } else if (key > node.key) {
            node.right = this.addSubtree(node.right, key, val);
            node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        } else {
            node.val = val;
        }

        const balanceFactor = this.getBalanceFactor(node);
        if (Math.abs(balanceFactor) > 1) {
            console.log('unbalanced')
        }
        // LL
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
            node = this.rightRotate(node);
        // LR
        } else if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.leftRotate(node.left as Node<K, V>);
            node = this.rightRotate(node);
        // RR
        } else if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
            node = this.leftRotate(node);
        // RL
        } else if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rightRotate(node.right as Node<K, V>);
            node = this.leftRotate(node);
        }
        return node;
    }

    private rightRotate(node: Node<K, V>): Node<K, V> {
        const leftNode = node.left!;
        const right = leftNode!.right;
        leftNode.right = node;
        node.left = right;
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        leftNode.height = Math.max(this.getHeight(leftNode.left), node.height) + 1;
        return leftNode;
    }

    private leftRotate(node: Node<K, V>): Node<K, V> {
        const rightNode = node.right!;
        const left = rightNode!.left;
        rightNode.left = node;
        node.right = left;
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        rightNode.height = Math.max(node.height, this.getHeight(rightNode.right)) + 1;
        return rightNode;
    }

    contains(key: K): boolean {
        return this.containsSubtree(this.root, key);
    }

    private containsSubtree(node: Node<K, V> | null, key: K): boolean {
        if (node === null) {
            return false;
        }

        if (key < node.key) {
            return this.containsSubtree(node.left, key);
        } else if (key > node.key) {
            return this.containsSubtree(node.right, key);
        } else {
            return true;
        }
    }

    minimum(): Node<K, V> | null {
        if (this.root) {
            return this.minimumSubtree(this.root);
        }
        return null;
    }

    private minimumSubtree(node: Node<K, V>): Node<K, V> {
        if (node.left) {
            return this.minimumSubtree(node.left);
        }
        return node;
    }

    maximum(): Node<K, V> | null {
        if (this.root) {
            return this.maximumSubtree(this.root);
        }
        return null;
    }

    private maximumSubtree(node: Node<K, V>): Node<K, V> {
        if (node.right) {
            return this.maximumSubtree(node.right);
        }
        return node;
    }

    removeMin(): Node<K, V> | null {
        const ret = this.minimum();
        if (this.root) {
            this.root = this.removeMinSubtree(this.root);
        }
        return ret;
    }

    private removeMinSubtree(node: Node<K, V>): Node<K, V> | null {
        if (!node.left) {
            const right = node.right;
            node.right = null;
            this.size--;
            return right;
        }
        node.left = this.removeMinSubtree(node.left);
        return node;
    }

    remove(key: K): V | null {
        const node = this.getNode(this.root, key);
        this.root = this.removeSubtree(this.root, key);
        if (node === null) {
            return null;
        }
        return node.val;
    }

    private getNode(node: Node<K, V> | null, key: K): Node<K, V> | null {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            return this.getNode(node.left, key);
        } else if (key > node.key) {
            return this.getNode(node.right, key);
        }
        return node;
    }

    private removeSubtree(node: Node<K, V> | null, key: K): Node<K, V> | null {
        if (node === null) {
            return null;
        }

        let retNode;
        if (key < node.key) {
            node.left = this.removeSubtree(node.left, key);
            retNode = node;
        } else if (key > node.key) {
            node.right = this.removeSubtree(node.right ,key);
            retNode = node;
        } else 

        // 当前节点即待删除的节点
        if (node.left === null) {
            const right = node.right;
            node.right = null;
            this.size--;
            retNode = right;
        } else if (node.right === null) {
            const left = node.left;
            node.left = null;
            this.size--;
            retNode = left;
        } else {
            const successor = this.minimumSubtree(node.right);
            successor.right = this.removeSubtree(node.right, successor.key);
            successor.left = node.left;
            retNode = successor;
        }

        if (!retNode) {
            return null;
        }

        retNode.height = 1 + Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right));
        const balanceFactor = this.getBalanceFactor(retNode);
        if (Math.abs(balanceFactor) > 1) {
            console.log('unbalanced')
        }
        // LL
        if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
            retNode = this.rightRotate(retNode);
        // LR
        } else if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) < 0) {
            retNode.left = this.leftRotate(retNode.left as Node<K, V>);
            retNode = this.rightRotate(retNode);
        // RR
        } else if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
            retNode = this.leftRotate(retNode);
        // RL
        } else if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) > 0) {
            retNode.right = this.rightRotate(retNode.right as Node<K, V>);
            retNode = this.leftRotate(retNode);
        }
        return retNode;
    }
}