/**
 * @file 101. 对称二叉树
 * @link https://leetcode-cn.com/problems/symmetric-tree/
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

export function isSymmetric(root: TreeNode | null): boolean {

};

