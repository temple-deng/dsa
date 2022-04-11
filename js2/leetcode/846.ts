export {}

function isNStraightHand(hand: number[], groupSize: number): boolean {
    if (hand.length % groupSize || !hand.length) {
        return false;
    }
    if (groupSize === 1) {
        return true;
    }

    hand.sort((a, b) => a - b);

    // 那现在已经拍好序了
    // 那我们要做的就是，从前到后，不断挑出 groupSize 张连续牌，如果有一次不能了，就 return 即可

    // 这里该怎么迭代呢
    // 我要分成 N 轮
    // 每一轮从一个元素开始
    // 向后迭代
    // 如何判断一个元素用过没，可以直接置位，那下一次使用的位置，就得迭代一下，很麻烦
    // 用一个标记位吧，unusedMinIndex = 0;
    // 那也不对啊，如果我不去修改数据元素的个数，那么会是一个 n2 的算法

    const group = hand.length / groupSize;
    let ununsedMinIndex = 0;

    for (let i = 0; i < group; i++) {
        let curr = hand[ununsedMinIndex];
        ununsedMinIndex++;
        let n = 1;
        for (let j = ununsedMinIndex; j <= hand.length; j++) {
            if (hand[i] === curr + 1) {
                n++;
                hand[i] = -1;
            }
            if (n === groupSize) {
                break;
            }
        }
        if (n !== groupSize) {
            return false;
        }
    }
};