export interface Set<T> {
    add(e: T): void;
    remove(e: T): void;
    contains(e: T): boolean;
    getSize(): number;
    isEmpty(): boolean;
}
