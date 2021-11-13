/**
 * @file 404. 左叶子之和
 * @link https://leetcode-cn.com/problems/sum-of-left-leaves/
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


// 这有个陷阱，根节点不算左叶子。。。
export function sumOfLeftLeaves(root: TreeNode | null): number {
    return sum(root, 'right');
};

function sum(root: TreeNode | null, dir: string): number {
    if (root === null) {
        return 0;
    }

    if (root.left === null && root.right === null) {
        return dir === 'left' ? root.val : 0;
    } else {
        return sum(root.left, 'left') + sum(root.right, 'right');
    }
}