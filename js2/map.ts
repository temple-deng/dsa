export interface Map<K, V> {
    add(k: K, v: V): void;
    remove(k: K): V | null;
    contains(k: K): boolean;
    get(k: K): V | null;
    set(k: K, v: V): void;
    getSize(): number;
    isEmpty(): boolean;
}
