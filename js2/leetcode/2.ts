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
    let cur1 = l1;
    let cur2 = l2;
    let carry = 0;

    if (cur1 === null) {
        return l2;
    }
    if (cur2 === null) {
        return l1;
    }

    while (cur1.next !== null && cur2.next !== null) {
        let sum = cur1.val + cur2.val + carry;
        if (sum > 9) {
            sum = sum - 10;
            carry = 1;
        } else {
            carry = 0;
        }

        cur1 = cur1?.next;
        cur2 = cur2?.next;
        cur1.val = sum;
    }

    if (cur1.next === null) {
        while (cur2.next) {
            cur1
        }
    }
};