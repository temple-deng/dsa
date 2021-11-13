/**
 * @file 61. 旋转链表
 * @link https://leetcode-cn.com/problems/rotate-list/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function rotateRight(head: ListNode | null, k: number): ListNode | null {
    let dummy = { val: 0, next: head };
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    let i = 0;
    let len = 0;

    while (fast && fast.next) {
        len++;
        fast = fast.next;
    }

    fast = dummy;
    while (i < k % len && fast) {
        if (fast.next) {
            fast = fast.next;
        } else {
            fast = head;
        }
        i++;
    }
    if (!fast) {
        return null;
    }

    while (fast && fast.next) {
        fast = fast.next;
        slow = slow!.next;
    }
    const newHead = slow!.next;
    slow!.next = null;
    fast.next = dummy.next;
    return newHead;
};

export function rotateRight2(head: ListNode | null, k: number): ListNode | null {
    let dummy = { val: 0, next: head };
    let fast = dummy;
    let len = 0;

    if (head === null) {
        return null;
    }

    while (fast && fast.next) {
        fast = fast.next;
        len++;
    }

    fast.next = dummy.next;
    let step = len - k % len;
    fast = dummy.next!;
    for (let i = 1; i < step; i++) {
        fast = fast.next!;
    }
    const newHead = fast.next;
    fast.next = null;
    return newHead;
}