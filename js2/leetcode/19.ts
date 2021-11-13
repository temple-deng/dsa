/**
 * @file 19. 删除链表的倒数第 N 个结点
 * @link https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = {val: 0, next: head};
    let slow = dummy;
    let fast = dummy;
    let i = 0;

    while (i <= n && fast) {
        fast = fast.next!;
        i++;
    }

    while (fast) {
        fast = fast.next!;
        slow = slow.next!;
    }
    slow.next = slow.next ? slow.next.next : null;

    return dummy.next;
};