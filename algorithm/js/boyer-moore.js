function buildBadCharsTable(text, pattern) {
  const tLen = text.length;
  const pLen = pattern.length;
  const map = new Map();

  for (let i = 0; i < tLen; i++) {
    map.set(text[i], pLen);
  }

  for (let i = 0; i < pLen - 1; i++) {
    if (!map.has(pattern[i])) {
      return {
        map: null,
        ok: false
      };
    } else {
      map.set(pattern[i], pLen - 1 - i);
    }
  }

  return {
    map,
    ok: true
  };
}

function buildGoodSuffTable(pattern) {
  const pLen = pattern;
  for (let i = 0; i < pLen-1; i++) {
    // 不会啊。。。。
  }
}