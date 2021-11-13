/**
 * @file 82. 删除排序链表中的重复元素 II
 * @link https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummayHead = { val: -Infinity, next: head };
    let prev = dummayHead
    let cur = dummayHead.next;

    while (cur) {
        if (cur.next && cur.val === cur.next.val) {
            while (cur.next && cur.val === cur.next.val) {
                cur.next = cur.next.next;
            }
            prev.next = cur.next;
            cur = cur.next;
        } else {
            prev = cur;
            cur = cur.next;
        }
    }

    return dummayHead.next;
};