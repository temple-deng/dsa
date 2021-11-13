/**
 * @file 83. 删除排序链表中的重复元素
 * @link https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
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
    let cur = head;
    
    while (cur !== null && cur.next !== null) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }

    return head;
};