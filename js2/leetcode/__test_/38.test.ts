import { countAndSay } from '../38';

test('38', () => {
    expect(countAndSay(1)).toBe('1')
    expect(countAndSay(2)).toBe('11')
    expect(countAndSay(3)).toBe('21')
    expect(countAndSay(4)).toBe('1211')
    expect(countAndSay(5)).toBe('111221')
});