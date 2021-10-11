export interface UnionFind {
    isConnected(p: number, q: number): boolean;
    unionElements(p: number, q: number): void;
}