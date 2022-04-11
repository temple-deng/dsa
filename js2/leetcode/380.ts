export {}

class RandomizedSet {
    map: Map<number, number>;
    set: Set<number>;
    arr: number[];
    size = 0;
    constructor() {
        this.map = new Map();
        this.set = new Set();
        this.arr = [];
    }

    insert(val: number): boolean {
        if (this.map.has(val)) {
            return false;
        }
        this.map.set(val, this.size);
        this.arr[this.size] = val;
        this.size++;
        return true
    }

    remove(val: number): boolean {
        if (!this.map.has(val)) {
            return false;
        }

        const index = this.map.get(val) as number;
        const lastIndex = this.size - 1;
        this.swap(index, lastIndex);
        this.map.set(this.arr[index], index);
        this.map.delete(val);
        this.size--;
        return true;
    }

    getRandom(): number {
        const randomIndex = Math.floor(Math.random() * this.size);
        return this.map.get(this.arr[randomIndex]) as number;
    }

    swap(i: number, j: number) {
        const temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = this.arr[i];
    }
}