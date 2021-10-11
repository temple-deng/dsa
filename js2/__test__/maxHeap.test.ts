import MaxHeap from "../maxHeap";

test('MaxHeap fn', () => {
    const heap = new MaxHeap<number>();

    for (let i = 0; i < 10000; i++) {
        const val = parseInt(Math.random() * 10000 + '');
        heap.add(val);
    }

    const arr = [];
    const size = heap.getSize();
    for (let i = 0; i < size; i++) {
        arr.push(heap.extractMax());
    }

    for (let i = 1; i < arr.length; i++) {
        expect(arr[i - 1] - arr[i]).toBeGreaterThanOrEqual(0);
    }
});
