/**
 * @file 575 分糖果
 * @link https://leetcode-cn.com/problems/distribute-candies/
 * @desc 看的很复杂，其实仔细想一下很简单
 */

function distributeCandies(candyType: number[]): number {
    const map = new Map();
    candyType.forEach(type => {
        if (map.has(type)) {
            map.set(type, map.get(type) + 1);
        } else {
            map.set(type, 1);
        }
    });

    const eatNum = candyType.length / 2;
    const typeNum = map.size;
    if (eatNum >= typeNum) {
        return typeNum;
    } else {
        return eatNum;
    }
};