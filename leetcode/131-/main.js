/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  var res = [];
  if (s.length === 0) {
    return res;
  }

  function part(split, index) {
    if (index === s.length) {
      res.push(split);
      return
    }

    let cur = '';
    for (let i = index; i < len; i++) {
      cur = cur + s[i];
      if (cur === cur.split('').reverse().join('')) {
        part(split.concat(cur), i+1, len-i-1);
      }
    }
  }
};