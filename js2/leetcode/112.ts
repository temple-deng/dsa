/**
 * @file 112. 路径总和
 * @link https://leetcode-cn.com/problems/path-sum/
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

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) {
        return false;
    }

    const left = targetSum - root.val;
    if (root.left === null && root.right === null) {
        return root.val === targetSum;
    } else if (root.left === null) {
        return hasPathSum(root.right, left);
    } else if (root.right === null) {
        return hasPathSum(root.left, left);
    } else {
        return hasPathSum(root.left, left) || hasPathSum (root.right, left);
    }
};


function hasPathSum2(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) {
        return false;
    }
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};