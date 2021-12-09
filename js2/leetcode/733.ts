/**
 * @file 733
 */

let visited: boolean[][] = [];
let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

export function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const m = image.length;
    const n = image[0].length;
    for (let i = 0; i < m; i++) {
        visited[i] = new Array(n);
    }
    visited[sr][sc] = true;
    fill(image, sr, sc, newColor);
    visited[sr][sc] = false;
    return image;
};

function fill(image: number[][], sr: number, sc: number, newColor: number) {
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        const newX = sr + x;
        const newY = sc + y;
        if (
            newX >= 0 && newY >=0 && newX < image.length && newY < image[0].length
            && !visited[newX][newY] && image[newX][newY] === image[sr][sc]
        ) {
            visited[newX][newY] = true;
            fill(image, newX, newY, newColor);
            visited[newX][newY] = false;
        }
    }
    image[sr][sc] = newColor;
}