class LoopQueue {
  constructor(cap = 10) {
    if (typeof cap !== 'number' || isNaN(cap) || cap < 0) {
      cap = 10;
    }

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

  }
}