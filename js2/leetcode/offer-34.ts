/**
 * 
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

export {}

function pathSum(root: TreeNode | null, target: number): number[][] {
    const res: number[][] = [];
    if (root === null) {
        return [];
    }

    calcSum(root, target, [], res);
    return res;
};

function calcSum(root: TreeNode, target: number, cur: number[], res: number[][]) {
    if (root.left === null && root.right === null) {
        if (target === root.val) {
            cur.push(root.val);
            res.push(cur.slice());
            cur.pop();
        }
        return;
    }

    const last = target - root.val;
    if (root.left) {
        cur.push(root.val);
        calcSum(root.left, last, cur, res);
        cur.pop();
    }

    if (root.right) {
        cur.push(root.val);
        calcSum(root.right, last, cur, res);
        cur.pop();
    }
}