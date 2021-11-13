/**
 * @file 147. 对链表进行插入排序
 * @link https://leetcode-cn.com/problems/insertion-sort-list/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function insertionSortList(head: ListNode | null): ListNode | null {
    let prev = head;
    if (head === null) {
        return null;
    }
    let cur = head.next;

    while (cur) {
        if (cur.val < prev!.val) {
            let p = head;
            let c = p.next;
            while (c !== cur && c!.val <= cur.val) {
                p = c!;
                c = c!.next;
            }
            const next = cur.next;
            p.next = cur;
            cur.next = c;
            prev!.next = next;
            cur = next;
        } else {
            prev = cur;
            cur = cur.next;
        }
    }

    return head;
};