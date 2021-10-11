export interface Queue<T> {
    enqueue(e: T): void;
    dequeue(): T;
    getFront(): T;
    getSize(): number;
    isEmpty(): boolean;
}
