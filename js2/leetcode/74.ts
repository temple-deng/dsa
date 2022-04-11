/**
 * 
 */
export {}

function searchMatrix(matrix: number[][], target: number): boolean {
    const m = matrix.length;
    const n = matrix[0].length;

    let row = 0;
    while (row < m && matrix[row][n - 1] < target) {
        row++;
    }

    if (row === m) {
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (matrix[row][i] === target) {
            return true;
        }
    }

    return false;
};