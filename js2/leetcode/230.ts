/**
 * @file 
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

export function kthSmallest(root: TreeNode | null, k: number): number {
    const stack = [];

    while (stack.length || root !== null) {
        while (root !== null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop()!;
        k--;
        if (0 === k) {
            return root!.val;
        }
        root = root!.right;
    }

    return root!.val;
};