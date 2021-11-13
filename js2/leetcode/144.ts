/**
 * @file 144 二叉树的前序遍历
 * @link https://leetcode-cn.com/problems/binary-tree-preorder-traversal/submissions/
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

export function preorderTraversal(root: TreeNode | null): number[] {
    const arr: number[] = [];
    pre(root, arr);
    return arr;
};

function pre(node: TreeNode | null, arr: number[]) {
    if (node === null) {
        return null;
    }

    arr.push(node.val);
    pre(node.left, arr);
    pre(node.right, arr);
}