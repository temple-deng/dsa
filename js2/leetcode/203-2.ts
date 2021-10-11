class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

export function removeElements(head: ListNode | null, val: number): ListNode | null {
    let dummayHead = new ListNode(0);
    dummayHead.next = head;

    let prev = dummayHead;
    while (prev.next !== null) {
        if (prev.next.val === val) {
            prev.next = prev.next.next;
        } else {
            prev = prev.next;
        }
    }

    return dummayHead.next;
};