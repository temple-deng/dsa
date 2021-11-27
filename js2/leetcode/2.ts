/**
 * @file 2 两数相加
 * @link https://leetcode-cn.com/problems/add-two-numbers/
 * 这就是个普通的链表问题吧
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

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

};