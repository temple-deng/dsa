/**
 * @file 100. 相同的树
 * @link https://leetcode-cn.com/problems/same-tree/
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


export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null || q === null) {
        return p === null && q === null;
    }
    if (p.val !== q.val) {
        return false;
    }

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};