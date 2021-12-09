/**
 * @file 116. 填充每个节点的下一个右侧节点指针
 * @link https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
 */

class Node {
    val: number
    left: Node | null
    right: Node | null
    next: Node | null
    constructor(val?: number, left?: Node, right?: Node, next?: Node) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
        this.next = (next===undefined ? null : next)
    }
}

interface QueueNode {
    node: Node | null;
    depth: number;
}

export function connect(root: Node | null): Node | null {
    const queue: QueueNode[] = [{
        node: root,
        depth: 0,
    }];
    let prevNode: QueueNode = {
        node: null,
        depth: 0,
    };

    while (queue.length && queue[0].node) {
        const top = queue.shift()!;
        if (prevNode.node && top.depth === prevNode.depth) {
            prevNode.node.next = top.node;
        }
        prevNode = top;
        queue.push({
            node: top.node!.left,
            depth: top.depth + 1
        }, {
            node: top.node!.right,
            depth: top.depth + 1
        });
    }

    return root;
};