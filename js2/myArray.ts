export default class MyArray<T> {
    private data: T[];
    private size = 0;

    constructor(capacity = 10) {
        this.data = new Array(capacity);
    }

    getSize() {
        return this.size;
    }

    getCapacity() {
        return this.data.length;
    }

    isEmpty() {
        return !!this.size;
    }

    addFirst(e: T) {
        this.add(0, e);
    }

    addLast(e: T) {
        this.add(this.size, e);
    }

    add(index: number, e: T) {
        if (index < 0 && index > this.size) {
            throw new Error('Add failed. Require index >= 0 and index <= size');
        }
        if (this.size === this.getCapacity()) {
            this.resize( 2 * this.data.length);
        }

        for (let i = this.size - 1; i >= index; i--) {
            this.data[i + 1] = this.data[i];
        }
        this.data[index] = e;
        this.size++;
    }

    resize(capacity: number) {
        const newData = new Array(capacity);
        const {size, data} = this;
        for (let i = 0; i < size; i++) {
            newData[i] = data[i];
        }
        this.data = newData;
    }

    get(index: number): T {
        if (index < 0 || index > this.size) {
            throw new Error('Get failed. Index is illegal');
        }
        return this.data[index];
    }

    getFirst(): T {
        return this.get(0);
    }

    getLast(): T {
        return this.get(this.size - 1);
    }

    set(index: number, e: T) {
        if (index < 0 || index > this.size) {
            throw new Error('Set failed. Index is illegal');
        }
        this.data[index] = e;
    }

    contains(e: T) {
        const {data, size} = this;
        for (let i = 0; i < size; i++) {
            if (data[i] === e) {
                return true;
            }
        }
        return false;
    }

    find(e: T) {
        const {data, size} = this;
        for (let i = 0; i < size; i++) {
            if (data[i] === e) {
                return i;
            }
        }
        return -1;
    }

    remove(index: number) {
        const {data, size} = this;

        if (index < 0 || index > size) {
            throw new Error('Delete faild. Index is illegal.');
        }
        const val = data[index];
        for (let i = index; i < size - 1; i++) {
            data[i] = data[i + 1];
        }
        this.size--;

        if (size === data.length / 4 && data.length / 2 !== 0) {
            this.resize(data.length / 2);
        }
        return val;
    }

    removeFirst() {
        return this.remove(0);
    }

    removeLast() {
        return this.remove(this.size - 1);
    }

    toString() {
        const {data, size} = this;
        console.log(`Array: size = ${size}, capacity = ${data.length}`);
        let str = '[';
        for (let i = 0; i < size; i++) {
            str += data[i];
            i === size - 1 && (str += ', ');
        }
        str += ']';
        console.log(str);
    }

    valueOf() {
        return this.toString();
    }
}