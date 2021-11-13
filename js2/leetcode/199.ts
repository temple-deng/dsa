/**
 * @file 199. 二叉树的右视图
 * @link https://leetcode-cn.com/problems/binary-tree-right-side-view/
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

export function rightSideView(root: TreeNode | null): number[] {
    const res: number[] = [];

    if (root === null) {
        return [];
    }
    let cur = null;
    let curLevel = 0
    const queue: Item[] = [{depth: 0, node: root}];

    while (queue.length) {
        const {depth, node} = queue.shift() as Item;
        if (depth !== curLevel) {
            res.push(cur!.val);
            curLevel = depth;
        }
        cur = node;

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

    if (cur) {
        res.push(cur.val);
    }
    return res;
};