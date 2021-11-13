/**
 * @file 236. 二叉树的最近公共祖先
 * @link https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
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
	// 想要在这个树中找公共节点，根据之前的经验，只要一个节点在左侧，一个节点在右侧，这就是一个公共节点
    // 所以我想的是先在当前左子树中找两个点
    if (root === null || p === null || q === null) {
        return null;
    }

    if (root.val === p.val || root.val === q.val) {
        return root;
    }

    const pInLeft = findNode(root.left, p);
    const qInRight = findNode(root.right, q);

    // const pInRight = findNode(root.right, p);
    // const qInLeft = findNode(root.left, q);
    if (pInLeft && qInRight) {
        return root;
    } else if (pInLeft && !qInRight) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (!pInLeft && qInRight) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};

function findNode(node: TreeNode | null, p: TreeNode | null): boolean {
    if (node === null || p === null) {
        return false;
    }

    if (node.val === p.val) {
        return true;
    }
    return findNode(node.left, p) || findNode(node.right, p);
}