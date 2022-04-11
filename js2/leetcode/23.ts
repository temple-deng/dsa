function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) {
        return list2;
    }

    if (list2 === null) {
        return list1;
    }

    let cur;
    let cur1 = list1;
    let cur2 = list2;
    if (cur1.val > cur2.val) {
        cur = cur2;
        cur2 = cur2.next!;
    } else {
        cur = cur1;
        cur1 = cur1.next!;
    }

    let head = cur;
    while (cur1 || cur2) {
        if (!cur1) {
            cur.next = cur2;
            break;
        }
        if (!cur2) {
            cur.next = cur1;
            break;
        }
        if (cur1.val <= cur2.val) {
            cur.next = cur1;
            cur = cur.next;
            cur1 = cur1.next!;
        } else {
            cur.next = cur2;
            cur = cur.next;
            cur2 = cur2.next!;
        }
    }

    return head;
};

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    return lists.reduce((prev: ListNode | null, cur: ListNode | null) => {
        return mergeTwoLists(prev, cur);
    }, null);
};

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export {}