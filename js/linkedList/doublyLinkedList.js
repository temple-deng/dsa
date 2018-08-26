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
 * 否则性能可能比单链表还差
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
    for (i = 0; i < index; i++) {
      prev = prev.next;
    }

    let node = new Node(value);
    let next = prev.next;
    node.next = next;
    node.prev = prev;
    prev.next = node;
    next.prev = node;
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
    node.prev = node.next = null;
    this.size--;
  }
}

module.exports = DoublyLinkedList;



