/**
 * @file 235. 二叉搜索树的最近公共祖先
 * @link https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
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

export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	if (root === null) {
        return null;
    }

    const max = Math.max(p!.val, q!.val);
    const min = Math.min(p!.val, q!.val);
    if (root.val === max) {
        return root;
    }

    if (max < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (min > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};