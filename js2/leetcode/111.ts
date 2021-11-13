/**
 * @file 110. 平衡二叉树
 * @link https://leetcode-cn.com/problems/balanced-binary-tree/
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


export function isBalanced(root: TreeNode | null): boolean {
    if (root === null) {
        return true;
    }
    if (!isBalanced(root.left)) {
        return false;
    }
    if (!isBalanced(root.right)) {
        return false;
    }
    return Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1;
};

function getHeight(root :TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
}