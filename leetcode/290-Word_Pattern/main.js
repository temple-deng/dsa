/**
 * 给定一种 pattern(模式) 和一个字符串 str ，判断 str 是否遵循相同的模式。
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
  let arr = str.split(' ');
  const sl = arr.length;
  const pl = pattern.length;

  if (sl !== pl) {
    return false;
  }

  // 首先 map 用来将一个 pattern 中的字符映射到一个子串
  // set 则用来保存已经被映射的子串，防止不同的pattern 字符映射到同一个子串
  // 这也是不正确的
  const map = new Map();
  const set = new Set();

  for (let i = 0; i < sl; i++) {
    const char = pattern[i];
    const desc = arr[i];
    if (!map.has(char) && !set.has(desc)) {
      map.set(char, desc);
      set.add(desc);
    } else if(map.has(char)) {
      if(map.get(char) != desc) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};