/**
 * @file 437. 路径总和 III
 * @link https://leetcode-cn.com/problems/path-sum-iii/
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

export function pathSum(root: TreeNode | null, targetSum: number): number {
    if (root === null) {
        return 0;
    }

    let res = ps(root, targetSum);
    if (root.left) {
        res += pathSum(root.left, targetSum);
    }
    if (root.right) {
        res += pathSum(root.right, targetSum);
    }
    return res;
};

function ps(node: TreeNode, target: number): number {
    const num = node.val === target ? 1 : 0;
    if (node.left === null && node.right === null) {
        return num;
    }
    if (node.right === null) {
        return num + ps(node.left!, target - node.val);
    }
    if (node.left === null) {
        return num + ps(node.right, target - node.val);
    }
    return num + ps(node.left!, target - node.val) + ps(node.right!, target - node.val);
}