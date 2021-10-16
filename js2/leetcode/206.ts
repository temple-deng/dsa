/**
 * @file 206 反转链表
 * @link https://leetcode-cn.com/problems/reverse-linked-list/
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
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// 这个题使用 3 指针其实是比较好想的，难点是节点更新的顺序，从左向右依次更新
export function reverseList(head: ListNode | null): ListNode | null {
    if (head === null) {
        return head;
    }

    let prev = null;
    let cur = head;
    let next = cur.next;
    while (next !== null) {
        cur.next = prev;
        prev = cur;
        cur = next;
        next = next.next;
    }
    cur.next = prev;
    return cur;
};

