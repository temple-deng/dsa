class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.dummyHead = new Node(null);
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(index, data) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of the range");
    }

    let prev = this.dummyHead;
    // 这样想：遍历完索引 i 后，prev 指向索引 i 的节点，因此当 i = index 退出循环时
    // i 指向 index - 1 的节点
    for(let i = 0; i < index; i++) {
      prev = prev.next;
    }

    const node = new Node(data);
    node.next = prev.next;
    prev.next = node;
    this.size++;
  }

  addFirst(data) {
    this.insert(0, data);
  }

  addLast(data) {
    this.insert(this.size, data);
  }

  remove(index) {
    if (index < 0 || index > this.size - 1) {
      throw new Error("Index out of the range");
    }

    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }

    let node = prev.next;
    prev.next = node.next;
    const data = node.data;
    // 这里将 node 设置为 null 没什么作用吧，并且只是一个引用
    node.next = null;
    this.size--;
    return data;
  }

  removeFirst() {
    return this.remove(0);
  }

  removeLast() {
    return this.remove(this.size - 1);
  }

  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of the range");
    }

    let current = this.dummyHead.next;
    // 这里就不一样了，当遍历完索引 i 后, current 指向了索引为 i + 1 元素
    // 所以当循环终止时，current 指向了索引为 index 的节点
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.data;
  }

  getFirst() {
    return this.get(0);
  }

  getLast() {
    return this.get(this.size-1)
  }

  set(index, data) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of the range");
    }

    let current = this.dummyHead;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    current.data = data;
  }

  toString() {
    let str = `LinkedList: Size = ${this.size}\n`;
    let current = this.dummyHead.next;
    while(current != null) {
      str += `${current.data} -> `;
      current = current.next;
    }
    str += 'Null';
    return str;
  }
}

module.exports = LinkedList;
