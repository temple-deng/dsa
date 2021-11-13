/**
 * @file 113. 路径总和 II
 * @link https://leetcode-cn.com/problems/path-sum-ii/
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


export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    if (root === null) {
        return [];
    }

    return path(root, [], targetSum);
};

function path(root: TreeNode, p: number[], target: number): number[][] {
    const arr = p.concat(root.val);
    const last = target - root.val;
    if (root.left === null && root.right === null) {
        return last ? [] : [arr];
    }
    if (root.right === null) {
        return path(root.left!, arr, last);
    }
    if (root.left === null) {
        return path(root.right, arr, last);
    }
    return path(root.left!, arr, last).concat(path(root.right, arr, last));
}