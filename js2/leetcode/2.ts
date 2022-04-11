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
    let carry = 0;

    if (l1 === null) {
        return l2;
    }

    if (l2 === null) {
        return l1;
    }

    let cur: ListNode | null = null;
    let cur1 = l1;
    let cur2 = l2;

    while (cur1 && cur2) {
        if (cur) {
            cur = cur.next;
        } else {
            cur = cur1;
        }
        let sum = cur1.val + cur2.val + carry;
        if (sum >= 10) {
            sum = sum - 10;
            carry = 1;
        } else {
            carry = 0;
        }

        cur1.val = sum;
        cur1 = cur1.next!;
        cur2 = cur2.next!;
    }

    if (cur1) {
        while (cur1) {
            cur = cur!.next;
            let sum = cur1.val + carry;
            if (sum >= 10) {
                sum = sum - 10;
                carry = 1;
            } else {
                carry = 0;
            }
            cur1.val = sum;
            cur1 = cur1.next!;
        }
    }

    if (cur2) {
        cur!.next = cur2;
        while (cur2) {
            cur = cur!.next;
            let sum = cur2.val + carry;
            if (sum >= 10) {
                sum = sum - 10;
                carry = 1;
            } else {
                carry = 0;
            }
            cur2.val = sum;
            cur2 = cur2.next!;
        }
    }

    if (carry) {
        cur!.next  = new ListNode(carry);
    }

    return l1;
};