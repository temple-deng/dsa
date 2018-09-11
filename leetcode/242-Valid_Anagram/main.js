/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的一个字母异位词。
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  var map = new Map();

  var sL = s.length;
  var tL = t.length;

  if (sL !== tL) {
    return false;
  }

  for (let i = 0; i < sL; i++) {
    const char = s[i];
    if (map.has(char)) {
      let freq = map.get(char) + 1;
      map.set(char, freq);
    } else {
      map.set(char, 1);
    }
  }

  for (let i = 0; i < tL; i++) {
    const char = t[i];
    if (map.has(char)) {
      let freq = map.get(char) - 1;
      if (freq == 0) {
        map.delete(char);
      } else {
        map.set(char, freq);
      }
    } else {
      return false;
    }
  }
  return map.size == 0;
};

let s = "a";
let t = "ab";

console.log(isAnagram(s, t));