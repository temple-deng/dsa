/**
 * @file: 203 题，删除链表元素
 */
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

export function removeElements(head: ListNode | null, val: number): ListNode | null {
    while (head !== null && head.val === val) {
        head = head.next;
    }

    if (head === null) {
        return head;
    }

    let prev = head;
    while (prev.next !== null) {
        if (prev.next.val === val) {
            prev.next = prev.next.next;
        } else {
            prev = prev.next;
        }
    }

    return head;
};
