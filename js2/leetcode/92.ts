/**
 * @file 92. 反转链表 II
 * @link https://leetcode-cn.com/problems/reverse-linked-list-ii/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// error
export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    let index = 1;
    let prev = null;
    let cur = head;

    while (index < left) {
        prev = cur;
        cur = cur!.next;
        index++;
    }

    // 这次遍历后，cur 指向 left 节点
    // 下面这就是遍历的流程
    let prev1 = prev;
    let next = null;

    while (index < right) {
        next = cur!.next;
        cur!.next = next;
        prev1 = cur;
        cur = next;
        index++;
    }

    prev!.next!.next = next!;
    prev!.next =cur;

    return head;
};
