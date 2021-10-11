export class ArrayGenerator {
    static generateRandomArray(n: number, bound: number): number[] {
        const arr = new Array(n);;
        for (let i = 0; i < n; i++) {
            const random = Math.floor(Math.random() * bound);
            arr[i] = random;
        }
        return arr;
    }
}