/**
 * @file 86. 分隔链表
 * @link https://leetcode-cn.com/problems/partition-list/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function partition(head: ListNode | null, x: number): ListNode | null {
    let lt = head;
    let cur = head;
    let prev = null;

    while (cur !== null) {
        if (cur.val < x) {
            // 找到一个在前面的值，调整节点
        }
    }
};