export {}

function luckyNumbers (matrix: number[][]): number[] {
    const rowMinIndex = [];
    const columnMaxIndex = [];
    const ret = [];

    const m = matrix.length;
    const n = matrix[0].length;

    for (let i = 0; i < m; i++) {
        const row = matrix[i];
        let minIndex = 0;
        for (let j = 1; j < n; j++) {
            if (row[minIndex] > row[j]) {
                minIndex = j;
            }
        }
        rowMinIndex.push(minIndex);
    }

    for (let i = 0; i < n; i++) {
        let maxIndex = 0;
        for (let j = 1; j < m; j++) {
            if (matrix[j][i] > matrix[maxIndex][i]) {
                maxIndex = j;
            }
        }
        columnMaxIndex.push(maxIndex);
    }

    for (let i = 0; i < m; i++) {
        const minIndex = rowMinIndex[i];
        const maxIndex = columnMaxIndex[minIndex];
        if (maxIndex === i) {
            ret.push(matrix[i][minIndex]);
        }
    }

    return ret;
};