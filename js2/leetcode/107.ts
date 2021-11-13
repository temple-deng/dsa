/**
 * @file 107. 二叉树的层序遍历 II
 * @link https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
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

export function levelOrder(root: TreeNode | null): number[][] {
    const res: number[][] = [];

    if (root === null) {
        return [];
    }
    let cur = [];
    let curLevel = 0;
    const queue: Item[] = [{depth: 0, node: root}];

    while (queue.length) {
        const {depth, node} = queue.shift() as Item;
        if (depth !== curLevel) {
            // 新层级了
        } 
        if (res[depth]) {
            res[depth].push(node.val);
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