/**
 * 算一下复杂度：建表 O(n) + O(m-1) = O(n)
 * 匹配，卧槽匹配不好算啊
 * @param {string} text 文本
 * @param {string} pattern 待匹配模式
 * @return {int} 匹配的第一个字符的索引，如果不匹配返回 -1
 */

function Horspool(text, pattern) {
  const {map, ok} = buildTable(text, pattern);
  if (!ok) {
    return -1;
  }

  const tLen = text.length;
  const pLen = pattern.length;
  for (let i = pLen-1; i < tLen; ) {
    let j = pLen-1;
    for (; j >= 0; j--) {
      if (text[i-pLen+j+1] !== pattern[j]) {
        i = i + map.get(text[i]);
        break;
      }
    }
    if (j === -1) {
      return i+1-pLen;
    }
  }
  return -1;
}

/**
 * 构建一张表，里面存放着文本中每个字符在模式中的最后一个出现到模式末尾的距离
 * @param {string} text
 * @param {string} pattern
 * @return {object}: object.map 建好的表，ok 如果模式中存在文本里没有的字符，那么在
 * 建表时就可以直接通知匹配失败
 */
function buildTable(text, pattern) {
  const map = new Map();
  const tLen = text.length;
  const pLen = pattern.length;

  for (let i = 0; i < tLen; i++) {
    map.set(text[i], pLen);
  }

  for (let i = 0; i < pLen-1; i++) {
    if (!map.has(pattern[i])) {
      // 可以提前终止掉
      return {
        map: null,
        ok : false
      };
    }
    // pLen-1 是最后一个元素索引, i 是当前元素索引
    // 两者相减，就是两者之间的距离
    map.set(pattern[i], pLen-1-i);
  }
  return {
    map,
    ok: true
  };
}

const text = "Hello World";
const pattern = "World";

console.log(Horspool(text, pattern));