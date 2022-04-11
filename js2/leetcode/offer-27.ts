/**
 * 
 */

export {}

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

function mirrorTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }

    const left = root.left;
    const right = root.right;
    root.left = mirrorTree(right);
    root.right = mirrorTree(left);
    return root;
};

function isSymmetric(root: TreeNode | null): boolean {
    if (root === null) {
        return true;
    }

    return isSym(root.left, root.right);
};

function isSym(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left === null) {
        return right === null;
    }
    if (right === null) {
        return false;
    }

    if (left.val !== right.val) {
        return false;
    }
    
    return isSym(left.left, right.right) && isSym(left.right, right.left);
}