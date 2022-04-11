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

function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
    if (A === null || B === null) {
        return false;
    }

    return isSub(A, B, B);
};

function isSub(A: TreeNode | null, B: TreeNode, Broot: TreeNode): boolean {
    if (A === null) {
        return false;
    }
    if (A.val === B.val) {
        // 当前节点匹配，直接查看子树是否匹配

        if (!B.left && !B.right) {
            return true;
        } else if (!B.right) {
            // 只有左子树
            return isSub(A.left, B.left!, Broot) || isSub(A.left, Broot, Broot);
        } else if (!B.left) {
            return isSub(A.right, B.right!, Broot) || isSub(A.right, Broot, Broot);
        } else {
            return (isSub(A.left, B.left, Broot) && isSub(A.right, B.right, Broot)) || isSub(A.left, Broot, Broot) || isSub(A.right, Broot, Broot);
        }
    } else {
        return isSub(A.left, Broot, Broot) || isSub(A.right, Broot, Broot);
    }
}