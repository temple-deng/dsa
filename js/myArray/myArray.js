/**
 * 动态数组
 * 这里的数组并没有实现像 go 那样可以传入一个数组进行初始化的功能
 * done
 */
class MyArray {
  constructor(capacity = 100) {
    if (typeof capacity !== 'number' || isNaN(capacity) || capacity < 0) {
      capacity = 100;
    }
    this.data = new Array(capacity)
    this.length = 0;
  }

  /**
   * return array length
   * @returns {number}
   */
  getLength() {
    return this.length;
  }

  /** 
   * return array capacity
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
   * @param {bool} elem
   */
  contains(elem) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === elem) {
        return true;
      }
    }

    return false;
  }

  /**
   * @param {number} index
   * @return {any} 查找的元素值，如果索引不合法抛出错误
   */
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

  addLast(elem) {
    this.insert(this.length, elem);
  }

  addFirst(elem) {
    this.insert(0, elem);
  }

  /**
   * 介于 js 中的数组不存在需要扩容的问题，因此这里以及下面的 remove 操作中
   * 不做扩容和缩容的处理
   * @param {number} index 元素要插入的位置
   * @param {any} elem 插入的元素值
   */
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

  toString() {
    let str = "[ ";
    for (let i = 0; i < this.length - 1; i++) {
      str += this.data[i] + ', ';
    }

    if (this.length !== 0) {
      str += this.data[this.length - 1]
    }
    str += ' ]';
    return str;
  }
}

module.exports = MyArray;
