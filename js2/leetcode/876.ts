/**
 * @file 876. 链表的中间结点
 * @link https://leetcode-cn.com/problems/middle-of-the-linked-list/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function middleNode(head: ListNode | null): ListNode | null {
    let total = 0;
    let cur = head;

    while (cur !== null) {
        total++;
        cur = cur.next;
    }

    let mid = Math.floor(total / 2);
    let index = 0;

    cur = head;
    while (index !== mid) {
        index++;
        cur = cur?.next;
    }

    return cur;
};