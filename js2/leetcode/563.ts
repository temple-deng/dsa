/**
 * @file 563. 二叉树的坡度
 * @link https://leetcode-cn.com/problems/binary-tree-tilt/
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

export function findTilt(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    const tilt: number[] = []; 

    const leftNodeSum = nodeSum(root.left, tilt);
    const rightNodeSum = nodeSum(root.right, tilt);
    tilt.push(Math.abs(leftNodeSum - rightNodeSum));
    return tilt.reduce((prev, curr) => prev + curr, 0);
};

function nodeSum(node: TreeNode | null, tilt: number[]): number {
    if (node === null) {
        tilt.push(0);
        return 0;
    }

    const leftSum = nodeSum(node.left, tilt);
    const rightSum = nodeSum(node.right, tilt);
    tilt.push(Math.abs(leftSum - rightSum));
    return leftSum + rightSum + node.val;
}