/**
 * @file
 */

const map = new Map([
    ['1', 'A'],
    ['2', 'B'],
    ['3', 'C'],
    ['4', 'D'],
    ['5', 'E'],
    ['6', 'F'],
    ['7', 'G'],
    ['8', 'H'],
    ['9', 'I'],
    ['10', 'J'],
    ['11', 'K'],
    ['12', 'L'],
    ['13', 'M'],
    ['14', 'N'],
    ['15', 'O'],
    ['16', 'P'],
    ['17', 'Q'],
    ['18', 'R'],
    ['19', 'S'],
    ['20', 'T'],
    ['21', 'U'],
    ['22', 'V'],
    ['23', 'W'],
    ['24', 'X'],
    ['25', 'Y'],
    ['26', 'Z'],
])

 function numDecodings(s: string): number {
    const solution = [1, 1];

    for (let i = 2; i <= s.length; i++) {
        let num = 0;
        if (map.has(s[i - 1])) {
            num += solution[i - 1];
        }
        if (map.has(s[i - 1] + s[i - 2])) {
            num += solution[i - 2];
        }
        solution[i] = num;
    }

    return solution[solution.length - 1];
};
