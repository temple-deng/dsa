/**
 * @file 257. 二叉树的所有路径
 * @link https://leetcode-cn.com/problems/binary-tree-paths/
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

export function binaryTreePaths(root: TreeNode | null): string[] {
    if (root === null) {
        return [];
    }
    return path(root, '');
};

function path(root: TreeNode, prefix: string): string[] {
    const str = prefix ? (prefix + '->' + root.val) : (prefix + root.val);
    if (root.left === null && root.right === null) {
        return [str];
    }

    if (root.left === null) {
        return path(root.right!, str);
    }
    if (root.right === null) {
        return path(root.left!, str);
    }
    return path(root.left!, str).concat(path(root.right!, str));
}