import LinkedList from '../linkedList';

describe('LinkedList function test', () => {
    const linkedList = new LinkedList<number>();

    test('Add function ', () => {
        expect(linkedList.isEmpty()).toBeTruthy();
        linkedList.addFirst(0);
        expect(linkedList.getSize()).toBe(1);
        linkedList.addFirst(1);
        linkedList.addFirst(2);
        expect(linkedList.isEmpty()).toBeFalsy();
        expect(linkedList.getSize()).toBe(3);
        linkedList.add(1, 3);
        expect(linkedList.getSize()).toBe(4);
        // 2 3 1 0
    });

    test('Illegal index will throw error', () => {
        expect(() => linkedList.add(-1, 5)).toThrow(Error);
        expect(linkedList.getSize()).toBe(4);
        expect(() => linkedList.add(5, 6)).toThrow(Error);
        expect(linkedList.getSize()).toBe(4);
    });


    test('Get, set, delete function', () => {
        expect(linkedList.getFirst()).toBe(2);
        expect(linkedList.getLast()).toBe(0);
        expect(() => linkedList.get(5)).toThrow(Error);
        expect(linkedList.get(1)).toBe(3);
        linkedList.add(0, 9)
        // 9 2 3 1 0
        expect(linkedList.get(0)).toBe(9);
        linkedList.add(5, 10);
        // 9 2 3 1 0 10
        expect(linkedList.getLast()).toBe(10);
        linkedList.set(2, 100);
        // 9 2 100 1 0 10
        expect(linkedList.get(2)).toBe(100);

        let ret = linkedList.deleteFirst();
        // 2 100 1 0 10
        expect(ret).toBe(9);
        expect(linkedList.getSize()).toBe(5);
        expect(linkedList.getFirst()).toBe(2);
        expect(linkedList.delete(2)).toBe(1);
    });
});


