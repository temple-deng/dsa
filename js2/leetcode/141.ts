/**
 * @file 141. 环形链表
 * @link https://leetcode-cn.com/problems/linked-list-cycle/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function hasCycle(head: ListNode | null): boolean {
    // 没记错的话，这种题，使用快慢指针的方式，一个单步一个多步，如果有环终究会碰上
    // 有环的前提隐含着永远循环不完
    let slow = head;
    let fast = head;

    while (fast && fast.next && fast.next.next) {
        fast = fast.next.next;
        slow = slow!.next;

        if (fast === slow) {
            return true;
        }
    }

    return false;
};