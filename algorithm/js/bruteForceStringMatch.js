// function BruteForceStringMatch(text, pattern) {
//   const tLen = text.length;
//   const pLen = pattern.length;

//   // 注意这里临界值
//   for (let i = 0; i <= tLen-pLen; i++) {
//     let j = 0;
//     for (; j < pLen; j++) {
//       if (text[i+j] !== pattern[j]) {
//         break;
//       }
//     }
//     if (j === pLen) {
//       return i;
//     }
//   }
//   return -1
// }

// 这个好像有问题，还没有测试