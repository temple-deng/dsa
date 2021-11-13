/**
 * @file 114 二叉树的最小深度
 * @link https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
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

export function minDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    if (root.left && root.right) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
    } else if (root.left) {
        return minDepth(root.left) + 1;
    } else if (root.right) {
        return minDepth(root.right) + 1;
    } else {
        return 1;
    }
}