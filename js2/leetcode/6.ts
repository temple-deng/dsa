/**
 * @file 6. Z 字形变换
 * @link https://leetcode-cn.com/problems/zigzag-conversion/
 */

export function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s;
    }
    let down = true;
    let nextRowIndex = 0;
    const arr: string[][] = [];
    for (let i = 0; i < numRows; i++) {
        arr[i] = [];
    }

    let index = 0;
    while (index < s.length) {
        arr[nextRowIndex].push(s[index]);
        if (down) {
            nextRowIndex++;
            if (nextRowIndex === numRows) {
                down = false;
                nextRowIndex -= 2;
            }
        } else {
            nextRowIndex--;
            if (nextRowIndex === -1) {
                down = true;
                nextRowIndex = 1;
            }
        }
        index++;
    }

    let str = '';
    for (let i = 0; i < numRows; i++) {
        str += arr[i].join('');
    }
    return str;
};