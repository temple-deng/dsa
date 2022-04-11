/** */

export {}

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

function kthLargest(root: TreeNode | null, k: number): number {
    const res: number[] = [];

    inOrder(root, res);

    return res[res.length - k];
};

function inOrder(root: TreeNode | null, res: number[]) {
    if (root === null) {
        return;
    }

    inOrder(root.left, res);
    res.push(root.val);
    inOrder(root.right, res);
}
