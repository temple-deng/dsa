/**
 * @file 237 删除链表中的节点
 * @link https://leetcode-cn.com/problems/delete-node-in-a-linked-list/
 * @desc 只能拿到被删除的节点，那么猜想，我们并不实际删除节点，而是把待删除后面节点的节点值
 * 向前赋值
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
/**
 * Do not return anything, modify it in-place instead.
 */

export function deleteNode(root: ListNode | null): void {
    let cur = root;
    if (cur === null) {
        return;
    }
    while (cur.next !== null) {
        cur.val = cur.next.val;
        if (cur.next.next === null) {
            cur.next = null;
            return;
        } else {
            cur = cur.next;
        }
    }
};

function deleteNode2(root: ListNode): void {
    const next = root.next!;
    root.val = next.val;
    root.next = next.next;
    next.next = null;
};
