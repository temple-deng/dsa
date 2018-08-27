class Node {
  constructor(value) {
    this.next = this.prev = null;
    this.value = value;
  }

  toString() {
    return this.value.toString()
  }
}

/**
 * 单纯的双向链表好像和单链表没什么区别啊，还要多维护一个指针
 * 除非我们再添加一个 tail 指针指向链表中的最后一个节点，以便可以向前搜索
 * 又或者是使用双向循环链表
 * 否则性能可能比单链表还差
 * 我们这里先添加一个 tail 指针优化性能，循环链表放到另一个文件中实现
 */
class DoublyLinkedList {
  constructor() {
    this.dummyHead = new Node(null);
    this.tail = this.dummyHead;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(index, value) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of range");
    }

    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }

    let node = new Node(value);
    let next = prev.next;
    node.next = next;
    node.prev = prev;
    prev.next = node;

    // 在最后的位置进行插入
    if (next !== null) {
      next.prev = node;
    }
    this.size++;
  }

  addFirst(value) {
    this.insert(0, value);
  }

  addLast(value) {
    this.insert(this.size, value);
  }

  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of range");
    }

    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }

    let prev = cur.prev;
    let next = cur.next;
    prev.next = next;
    if (next !== null) {
      next.prev = prev;
    }
    cur.prev = cur.next = null;
    this.size--;
    return cur.value;
  }

  removeFirst() {
    return this.remove(0);
  }

  removeLast() {
    return this.remove(this.size - 1);
  }

  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of range");
    }

    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }

    return cur.value;
  }

  set(index, elem) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of range");
    }

    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }

    cur.value = elem;
  }

  getFirst() {
    return this.get(0);
  }

  getLast() {
    return this.get(this.size - 1);
  }

  toString() {
    let str = "[ ";
    let cur = this.dummyHead.next;
    while(cur !== null) {
      str += cur.value + " -> ";
      cur = cur.next;
    }

    str += "Null ]";
    return str;
  }
}

module.exports = DoublyLinkedList;
