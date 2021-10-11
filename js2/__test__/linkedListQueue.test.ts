import LinkedListQueue from "../linkedListQueue";

describe('LinkedList Queue', () => {
    const queue = new LinkedListQueue<number>();

    test('Base Fn', () => {
        expect(queue.getSize()).toBe(0);
        expect(queue.isEmpty()).toBeTruthy();
    });

    test('Queue operation', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.getSize()).toBe(3);
        expect(queue.getFront()).toBe(1);
        expect(queue.dequeue()).toBe(1);
        expect(queue.getFront()).toBe(2);
        expect(queue.isEmpty()).toBeFalsy();
    });

    test('Throw error', () => {
        queue.dequeue();
        queue.dequeue();
        expect(() => queue.dequeue()).toThrow(Error);
        expect(queue.getSize()).toBe(0);
        expect(() => queue.getFront()).toThrow(Error);
        queue.enqueue(100);
        expect(queue.getFront()).toBe(100);
    });

    test('Console', () => {
        queue.enqueue(200);
        queue.enqueue(300);
        expect(queue.toString()).toBe('Queue: front 100->200->300->Null tail');
    });
});