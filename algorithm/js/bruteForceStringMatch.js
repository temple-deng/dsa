function BruteForceStringMatch(text, pattern) {
  const tLen = text.length;
  const pLen = pattern.length;

  // 注意这里临界值
  for (let i = 0; i <= tLen-pLen; i++) {
    for (let j = 0; j < pLen; j++) {
      if (text[i+j] !== pattern[j]) {
        break;
      }
    }
    if (j === pLen) {
      return i;
    }
  }
  return -1
}

