/**
 * @file
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

export function isValidBST(root: TreeNode | null): boolean {
    const res: number[] = [];
    // 最好的方案应该是使用循环的方法中序遍历二叉树，然后在发现逆序的时候，直接 return;
    // 然而我不会。。。
    inOrder(root, res);
    for (let i = 0; i < res.length - 1; i++) {
        if (res[i] >= res[i + 1]) {
            return false;
        }
    }
    return true;
};

function inOrder(root: TreeNode | null, res: number[]) {
    if (root === null) {
        return;
    }

    inOrder(root.left, res);
    res.push(root.val);
    inOrder(root.right, res);
}


function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if (root === null) {
        return null;
    }
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
        return root;
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
        return root;
    } else {
        // 等于 key
        if (root.right === null) {
            const left = root.left;
            root.left = null;
            return left;
        }
        if (root.left === null) {
            const right = root.right;
            root.right = null;
            return right;
        }
        // 左右都有
        // 找一个右子树最小节点
        const successor = minimum(root.right);
        successor.right = removeMin(root.right);
        successor.left = root.left;
        root.left = root.right = null;
        return successor;
    }
};

function minimum(node: TreeNode): TreeNode {
    if (node.left) {
        return minimum(node.left);
    }
    return node;
}

function removeMin(node: TreeNode): TreeNode | null {
    if (node.left) {
        node.left = removeMin(node.left);
        return node;
    }
    const right = node.right;
    node.right = null;
    return right;
}
