/**
 * @file 104. 二叉树的最大深度
 * @link https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 */


export function maxDepth(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
