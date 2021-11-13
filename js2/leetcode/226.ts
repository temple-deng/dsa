/**
 * @file 226. 翻转二叉树
 * @link https://leetcode-cn.com/problems/invert-binary-tree/
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


export function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }

    const left = root.left;
    const right = root.right;

    root.left = invertTree(right);
    root.right = invertTree(left);
    return root;
};