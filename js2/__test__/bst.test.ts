import BST from '../bst';

describe('BST', () => {
    const bst = new BST();

    test('Add fn', () => {
        bst.add(100);
        bst.add(56);
        bst.add(100);
        bst.add(201);
        expect(bst.getSize()).toBe(3);
    });

    /**
     *         100
     *       /    \
     *     56    201
     */
    test('Contains fn', () => {
        expect(bst.contains(1)).toBeFalsy();
        expect(bst.contains(100)).toBeTruthy();
        expect(bst.contains(56)).toBeTruthy();
        expect(bst.contains(200)).toBeFalsy();
    });

    test('PreOrder fn', () => {
        const arr: number[] = [];
        bst.preOrder((val: number) => {
            arr.push(val);
        });
        expect(arr).toEqual([100, 56, 201]);
        const arr2: number[] = [];
        bst.preOrderNR((val: number) => {
            arr2.push(val);
        });
        expect(arr).toEqual([100, 56, 201]);
    });

    test('Removemin fn', () => {
        const newTree = new BST<number>();
        for (let i = 0; i < 1000; i++) {
            const val = parseInt(Math.random() * 1000 + '');
            newTree.add(val);
        }
        const arr: number[] = [];
        while (!newTree.isEmpty()) {
            arr.push(newTree.removeMin());
        }

        for (let i = 1; i < arr.length; i++) {
            expect(arr[i - 1] - arr[i]).toBeLessThan(0);
        }
    });

    test('Removemax fn', () => {
        const newTree = new BST<number>();
        for (let i = 0; i < 1000; i++) {
            const val = parseInt(Math.random() * 1000 + '');
            newTree.add(val);
        }
        const arr: number[] = [];
        while (!newTree.isEmpty()) {
            arr.push(newTree.removeMax());
        }

        for (let i = 1; i < arr.length; i++) {
            expect(arr[i] - arr[i - 1]).toBeLessThan(0);
        }
    });
});