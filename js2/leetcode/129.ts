/**
 * @file 129. 求根节点到叶节点数字之和
 * @link https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/
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

export function sumNumbers(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    return sum(root, '');
};

function sum(node: TreeNode, prefix: string): number {
    const n = prefix + node.val;
    if (node.left === null && node.right === null) {
        return Number(n);
    }

    if (node.right === null) {
        return sum(node.left!, n);
    }
    if (node.left === null) {
        return sum(node.right, n);
    }
    return sum(node.left, n) + sum(node.right, n);
}
