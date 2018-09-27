/**
 * 带有容量调整的最大堆
 */
class MaxHeap {
  /**
   * @param {int | Array} param 可以传入一个预估的堆的容量值或者传入一个数组
   */
  constructor(param) {
    if (Array.isArray(param)) {
      this.data = Array(param.length * 2);
      this.size = param.length * 2;
      this.length = param.length;

      for (let i = 0; i < this.length; i++) {
        this.data[i] = param[i];
      }
      this.heapify();
    } else {
      this.data = Array(param);
      this.size = param;
      this.length = 0;
    }
  }

  heapify() {
    const lastForkIndex = this.parent(this.length-1);
    for (let i = lastForkIndex; i >= 0; i--) {
      this.shiftDown(i);
    }
  }

  left(i) {
    return i * 2 + 1;
  }

  right(i) {
    return i * 2 + 2;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  
  /**
   * 注意虽然叫 GetSize 但其实是返回了当前堆中元素的个数
   * @returns {int} 堆中元素数量
   */
  GetSize() {
    return this.length;
  }

  IsEmpty() {
    return this.length === 0;
  }

  /**
   * 向堆中添加一个值
   * @param {any} val
   */
  Add(val) {
    if (this.length === this.size) {
      this.resize(this.length * 2);
    }

    this.data[this.length] = val;
    this.shiftUp(this.length);
    this.length++;
  }

  /**
   * 查看堆中最大的元素值
   * @returns {any} 堆中最大的元素
   */
  FindMax() {
    if (this.length === 0) {
      throw new Error("Empty Heap");
    }

    return this.data[0];
  }

  /**
   * 从堆中删除最大的元素并返回
   * @returns {any} 堆中最大的元素
   */
  ExtractMax() {
    const res = this.FindMax();
    this.data[0] = this.data[this.length-1];
    this.data[this.length-1] = null;
    this.length--;

    // 缩容操作
    if (this.length === this.size / 4 && this.size / 2 !== 0) {
      this.resize(this.size / 2);
    }

    this.shiftDown(0);
    return res;
  }
  
  /**
   * 将索引为 index 的元素进行下沉操作
   * @param {int} index
   */
  shiftDown(index) {
    while(this.left(index) < this.size) {
      let maxIndex = this.left(index);
      const leftVal = this.data[maxIndex];
      if (maxIndex + 1 < this.size && this.data[maxIndex+1] > leftVal) {
        maxIndex = maxIndex + 1;
      }

      const maxVal = this.data[maxIndex];
      if (maxVal > this.data[index]) {
        this.swap(maxIndex, index);
        index = maxIndex;
      } else {
        break;
      }
    }
  }

  /**
   * 将索引为 index 的元素进行上浮操作
   * @param {int} index
   */
  shiftUp(index) {
    let parentIndex = this.parent(index);
    while(index > 0 && this.data[parentIndex] < this.data[index]) {
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  /**
   * 交换堆中索引为 i 和 j 的元素的值
   * @param {int} i
   * @param {int} j
   */
  swap(i, j) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  /**
   * 容量调整
   * @param {int} newSize 新的容量
   */
  resize(newSize) {
    const data = Array(newSize);

    for (let i = 0; i < this.length; i++) {
      data[i] = this.data[i];
    }

    this.size = newSize;
    this.data = data;
  }
}