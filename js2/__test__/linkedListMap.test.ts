import LinkedListMap from "../linkedListMap";

describe('LinkedListMap', () => {
    const map = new LinkedListMap<string, any>();

    test('Basic Fn', () => {
        expect(map.getSize()).toBe(0);
    });

    test('Add Get', () => {
        map.add('a', 123);
        map.add('b', 456);
        expect(map.getSize()).toBe(2);
        expect(map.get('a')).toBe(123);
        expect(map.get('b')).toBe(456);
    });

    test('Set remove', () => {
        expect(map.remove('a')).toBe(123);
        map.set('b', 100);
        expect(map.contains('a')).toBeFalsy();
        expect(map.get('b')).toBe(100);
        map.remove('b');
        expect(map.isEmpty()).toBeTruthy();
    });
});