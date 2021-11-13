/**
 * @file 103. 二叉树的锯齿形层序遍历
 * @link https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
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

interface Item {
    node: TreeNode;
    depth: number;
}

export function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const res: number[][] = [];

    if (root === null) {
        return [];
    }
    const queue: Item[] = [{depth: 0, node: root}];

    while (queue.length) {
        const {depth, node} = queue.shift() as Item;
        if (res[depth]) {
            if (depth % 2) {
                res[depth].unshift(node.val);
            } else {
                res[depth].push(node.val);
            }
        } else {
            res[depth] = [node.val];
        }
        if (node.left) {
            queue.push({
                depth: depth + 1,
                node: node.left,
            });
        }
        if (node.right) {
            queue.push({
                depth: depth + 1,
                node: node.right,
            })
        }
    }

    return res;
};