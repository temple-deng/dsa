/**
 * 
 */

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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length) {
        return null;
    }

    // [1, 2]
    const rootVal = preorder[0];
    let rootIndex = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);
    const left = inorder.slice(0, rootIndex);
    const right = inorder.slice(rootIndex + 1);

    if (left.length) {
        root.left = buildTree(preorder.slice(1, preorder.indexOf(left[left.length - 1]) + 1), left);
    }

    if (right.length) {
        root.right = buildTree(
            left.length ? preorder.slice(preorder.indexOf(left[left.length - 1]) + 1) : preorder.slice(1),
            right
        );
    }

    return root;
}