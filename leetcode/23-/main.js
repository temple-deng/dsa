class MinHeap {
  constructor(n) {
    this.data = Array(n);
    this.length = 0;
    this.cap = n;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  insert(node) {
    if (this.length == this.cap) {
      this.resize(2 * this.cap);
    }

    this.data[this.length] = node;
    this.shiftUp(this.length);
    this.length++;
  }

  resize(newCap) {
    const newData = Array(newCap);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  shiftUp(i) {
    while (i > 0 && this.data[this.par(i)].val > this.data[i].val) {
      let parent = this.par(i);
      this.swap(i, parent);
      i = parent;
    }
  }

  shiftDown(i) {
    const size = this.length;
    while (this.left(i) < size) {
      let j = this.left(i);
      if ((j + 1) < size && this.data[j + 1].val < this.data[j].val) {
        j = j + 1;
      }

      if (this.data[i].val > this.data[j].val) {
        this.swap(i, j);
        i = j;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  extractMin() {
    let res = this.data[0];
    this.swap(0, this.length - 1);
    this.length--;
    this.shiftDown(0);
    return res;
  }

  left(i) {
    return i * 2 + 1;
  }

  right(i) {
    return i * 2 + 2;
  }

  par(i) {
    return Math.floor(i - 1 / 2);
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  lists = lists.filter((l) => {
    return l !== null;
  });

  const k = lists.length;

  if (k === 0) {
    return null;
  }
  const heap = new MinHeap(2 * k);

  for (let i = 0; i < k; i++) {
    for (let cur = lists[i]; cur != null; cur = cur.next) {
      heap.insert(cur);
    }
  }

  let head = null;
  let cur = null;
  if (!heap.isEmpty()) {
    head = cur = heap.extractMin();
  }

  while(!heap.isEmpty()) {
    cur.next = heap.extractMin();
    cur = cur.next;
  }

  cur.next = null;
  return head;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
};

function createList(arr) {
  if (arr.length === 0) {
    return null;
  }

  let head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }

  return head;
}


// [[-6,-3,-1,1,2,2,2],[-10,-8,-6,-2,4],[-2],[-8,-4,-3,-3,-2,-1,1,2,3],[-8,-6,-5,-4,-2,-2,2,4]]
let l1 = createList([-2, -1, -1, -1]);
let l2 = createList([-10,-8,-6,-2,4]);
let l3 = createList([-2]);
let l4 = createList([-8,-4,-3,-3,-2,-1,1,2,3]);
let l5 = createList([-8,-6,-5,-4,-2,-2,2,4]);



function printList(head) {
  let cur = head;
  let str = ''
  while (cur !== null) {
    str += cur.val + ' -> ';
    cur = cur.next;
  }
  console.log(str);
}

// printList(l1);
// printList(l2);
// printList(l3);

let head = mergeKLists([l1, null]);
console.log('aaaa')
printList(head);

// const heap = new MinHeap(23);

// const arr = [-6, -3, -1, 1, 2, 2, 2, -10, -8, -6, -2, 4, -2, -8, -4, -3, -3, -2, -1, 1, 2, 3, -8, -6, -5, -4, -2, -2, 2, 4];

// for (let i = 0; i < arr.length; i++) {
//   const node = new ListNode(arr[i]);
//   heap.insert(node, 0);
// }

// while (!heap.isEmpty()) {
//   console.log(heap.extractMin()[0].val);
// }