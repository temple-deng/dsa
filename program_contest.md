# 贪心法

贪心法就是遵循某种规则的，不断贪心地选取当前最优策略的算法设计办法。    

## 硬币问题

有 1元、5元、10元、50元、100元、500元的硬币给 C1, C2, C3, C4, C5, C6 枚。现在
要用这些硬币来支付 A 元，最少需要多少枚硬币？假定本题至少存在一种支付方案。    

```js
function coin(sum, countArr) {
  const value = [1, 5, 10, 50, 100, 500];
  const used = Array(6);
  let count = 0;

  for (let i = 5; i >= 0; i--) {
    // 可用的 value[i] 面值的硬币的数量
    const t = Math.min(countArr[i], Math.floor(sum / value[i]));
    sum = sum - (value[i] * t);
    used[i] = t;
    count += t;
  }

  return {
    used,
    count
  };
}
```    

在此题中，优先使用面值大的硬币就是我们在计算过程中所遵循的规则，这就是当前我们的最优策略。    

