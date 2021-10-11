import SegmentTree from "../segmentTree";

test('SegmentTree', () => {
    const nums = [-2, 0, 3, -5, 2, -1];
    const tree = new SegmentTree(nums, {
        merge(a: number, b: number) {
            return a + b;
        }
    });

    expect(tree.query(0, 2)).toBe(1);
    expect(tree.query(2, 5)).toBe(-1);
    expect(tree.query(0, 5)).toBe(-3);
});