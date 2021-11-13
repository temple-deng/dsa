/**
 * @file 234. 回文链表
 * @link https://leetcode-cn.com/problems/palindrome-linked-list/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// 这是个 O(N) 复杂度和 O(N) 空间复杂度的，不符合要求
export function isPalindrome(head: ListNode | null): boolean {
    const arr = [];
    let cur = head;

    while (cur !== null) {
        arr.push(cur.val);
    }

    return arr.join('') === arr.reverse().join();
};
