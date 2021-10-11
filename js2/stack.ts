export interface Stack<T> {
    push(e: T): void;
    pop(): T;
    peek(): T;
    getSize(): number;
    isEmpty(): boolean;
}

