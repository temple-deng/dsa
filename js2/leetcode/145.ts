/**
 * @file 145. 二叉树的后序遍历
 * @link https://leetcode-cn.com/problems/binary-tree-postorder-traversal/
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

export function postorderTraversal(root: TreeNode | null): number[] {
    const arr: number[] = [];
    post(root, arr);
    return arr;
};

function post(node: TreeNode | null, arr: number[]) {
    if (node === null) {
        return;
    }

    post(node.left, arr);
    post(node.right, arr);
    arr.push(node.val);
}