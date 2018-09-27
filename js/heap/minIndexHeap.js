export default class MinIndexHeap {
  /**
   * 最小索引堆
   * indexes[i] = x 表示索引为 x 的元素在 i 中位置
   * reverse[i] = y 表示索引为 i 的元素在 indexes 的 y 位置
   * @param {int} size 堆的大小，暂不支持容量调整和 heapify 操作
   */
  constructor(size) {
    this.data = Array(size);
    this.indexes = Array(size);
    this.reverse = Array(size);
    this.size = size;
    this.length = 0;

    // -1 表示对应的索引不在堆中
    for (let i = 0; i < size; i++) {
      this.reverse[i] = -1;
    }
  }

  GetSize() {
    return this.length;
  }

  IsEmpty() {
    return this.length === 0;
  }

  Contains(index) {
    if (index < 0 || index >= this.size) {
      return false;
    }

    return this.reverse[index] !== -1;
  }

  /**
   * 向索引堆中插入一个新的元素，新元素的索引为 index，值为 val
   * @param {int} index 新元素的索引
   * @param {any} val 新元素
   */
  Insert(index, val) {
    if (this.length === this.size) {
      throw new Error("No available heap space");
    }

    if (!this.Contains(index)) {
      this.data[index] = val;
      this.indexes[this.length] = index;
      this.reverse[index] = this.length;
      this.shiftUp(this.length);
      this.length++;
    } else {
      throw new Error("Index exists");
    }
  }

  GetMin() {
    if (this.length === 0) {
      throw new Error("Empty heap");
    }

    return this.data[this.indexes[0]];
  }

  GetMinIndex() {
    if (this.length === 0) {
      throw new Error("Empty heap");
    }
    return this.indexes[0];
  }

  GetItem(index) {
    if (this.Contains(index)) {
      return this.data[index];
    } else {
      return undefined;
    }
  }

  ExtractMin() {
    const min = this.GetMin();

    // 清空 data 中保存的元素
    this.data[this.indexes[0]] = null;
    
    // 重置 reverse 中的索引
    this.reverse[this.indexes[0]] = -1;
  
    // 将尾部元素上提
    this.indexes[0] = this.indexes[this.length-1];
    this.length--;
    this.shiftDown(0);
    return min;
  }

  ExtractMinIndex() {
    const minIndex = this.GetMinIndex();

    this.data[this.indexes[0]] = null;
    this.reverse[minIndex] = -1;
    this.indexes[0] = this.indexes[this.length-1];
    this.length--;
    this.shiftDown(0);
    return minIndex;
  }

  Change(index, val) {
    if (!this.Contains(index)) {
      throw new Error("Index doesn't exist");
    }

    this.data[index] = val;
    this.shiftUp(this.reverse[index]);
    this.shiftDown(this.reverse[index]);
    // for (let i = 0; i < this.length; i++) {
    //   if (this.indexes[i] === index) {
    //     this.shiftUp(i);
    //     this.shiftDown(i);
    //     return;
    //   }
    // }
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

  shiftUp(index) {
    while(index > 0 && this.data[this.indexes[this.parent(index)]] > this.data[this.indexes[index]]) {
      const parentIndex = this.parent(index);
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  shiftDown(index) {
    while(this.left(index) < this.length) {
      let minIndex = this.left(index);
      let leftVal = this.data[this.indexes[minIndex]];
      if (minIndex + 1 < this.length && this.data[this.indexes[minIndex+1]] < leftVal) {
        minIndex = minIndex + 1;
      }

      let minVal = this.data[this.indexes[minIndex]];
      if (minVal < this.data[this.indexes[index]]) {
        this.swap(minIndex, index);
        index = minIndex;
      } else {
        break;
      }
    }
  }

  /**
   * 交换索引为 i, j 的元素的索引位置
   */
  swap(i, j) {
    const temp = this.indexes[i];
    this.indexes[i] = this.indexes[j];
    this.indexes[j] = temp;
    this.reverse[this.indexes[j]] = j;
    this.reverse[this.indexes[i]] = i;
  }
}