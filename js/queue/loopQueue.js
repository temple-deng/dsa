/**
 * 循环队列
 * 需要格外注意的一点是，tail 并不是指向队尾元素，而是指向队尾元素的下一个位置
 * 同时我们在整个数组中空出一个元素，这样就避免了当 front === tail 的时候
 * 分不清是队列为空还是队列为满
 * 我们定义，当 (tail + 1) % size === front 为队满
 */
class LoopQueue {
  constructor(cap = 10) {
    if (typeof cap !== 'number' || isNaN(cap) || cap <= 0) {
      cap = 10;
    }

    this.cap = cap;
    this.data = new Array(cap + 1);
    this.front = 0;
    this.tail = 0;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(elem) {
    // 队满
    if ((this.tail + 1) % this.data.length === this.front) {
      this.resize(2 * this.cap);
    }

    this.data[this.tail] = elem;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }

  dequeue() {
    if (this.front === this.tail) {
      throw new Error("Queue is empty");
    }

    let elem = this.data[this.front];
    this.front = (this.front + 1) % this.data.length;
    this.size--;

    if (this.size === this.cap / 4 && this.cap / 2 > 0) {
      this.resize(this.cap / 2);
    }
    return elem;
  }

  getFront() {
    if (this.tail === this.front) {
      throw new Error("Queue is empty");
    }

    return this.data[this.front];
  }

  toString() {
    let str = "Queue Front [ ";
    if (this.tail !== this.front) {
      for (let i = this.front; i % this.data.length !== this.tail; i = (i+1) % this.data.length) {
        str += this.data[i];
        if ((i + 1) % this.data.length !== this.tail) {
          str += ", "
        }
      }
    }
    str += " ] Tail";
    return str;
  }

  resize(newSize) {
    console.log('resize to %s', newSize);
    const oldLength = this.data.length;
    let data = new Array(newSize + 1);
    this.cap = newSize;

    for (let i = 0; i < oldLength - 1; i++) {
      data[i] = this.data[(i + this.front) % oldLength];
    }
    this.front = 0;
    this.tail = this.size;
    this.data = data;
  }
}


module.exports = LoopQueue;
