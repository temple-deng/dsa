class MyArray {
  constructor(capacity = 100) {
    // 这里暂时不考虑 capacity < 0 的情况
    this.data = new Array(capacity)
    this.length = 0;
  }

  /**
   * @returns {number}
   */
  getLength() {
    return this.length;
  }

  /**
   * @returns {number}
   */
  getCapacity() {
    return this.data.length;
  }

  /**
   * @returns {bool}
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * js 中的数组不存在需要扩容的问题
   * @param {any} elem
   */
  addLast(elem) {
    this.insert(this.length, elem);
  }

  addFirst(elem) {
    this.insert(0, elem);
  }

  insert(index, elem) {
    if (index < 0 || index > this.length) {
      throw new Error('Index was out of range')
    }

    // 其实插入和删除用 splice 方法会不会更好
    for(let i = this.length; i > index; i--) {
      this.data[i] = this.data[i-1];
    }
    this.data[index] = elem;
    this.length++;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of the range");
    }

    return this.data[index];
  }

  set(index, elem) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of the range");
    }

    this.data[index] = elem;
  }

  contains(elem) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === elem) {
        return true;
      }
    }

    return false;
  }

  find(elem) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === elem) {
        return i;
      }
    }

    return -1; 
  }

  findAll(elem) {
    const indexs = [];
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === elem) {
        indexs.push(i);
      }
    }

    if (indexs.length === 0) {
      return -1;
    } else {
      return indexs;
    }
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of the range");
    }

    const elem = this.data[index];
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i+1];
    }
    this.length--;
    return elem;
  }

  removeLast() {
    return this.remove(this.length - 1);
  }

  removeFirst() {
    return this.remove(0)
  }

  // 奇怪为什么在 node 中 console.log 没有调用 toString() 方法
  toString() {
    let str = "Dynamic Array:\n\t[";
    for (let i = 0; i < this.length - 1; i++) {
      str += this.data[i] + ', ';
    }

    if (this.length !== 0) {
      str += this.data[this.length - 1]
    }
    str += ']';
    return str;
  }
}

module.exports = MyArray;
