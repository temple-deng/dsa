/**
 * @file 24. 两两交换链表中的节点
 * @link https://leetcode-cn.com/problems/swap-nodes-in-pairs/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function swapPairs(head: ListNode | null): ListNode | null {
    const dummayHead = {val: 0, next: head};

    let prev = dummayHead;
    let cur = dummayHead.next;

    while (cur && cur.next) {
        const next = cur.next;
        cur.next = next.next;
        next.next = cur;
        prev.next = next;
        prev = cur;
        cur = cur.next;
    }

    return dummayHead.next;
};