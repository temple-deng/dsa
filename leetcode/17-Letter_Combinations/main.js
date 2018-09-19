/**
 * @param {string} digits
 * @return {string[]}
 */
var map = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz'
};

var letterCombinations = function (digits) {
  if (!digits) {
    return [];
  }
  var result = [];
  (function letter(digits, index, prefix) {
    if (index === digits.length - 1) {
      let char = digits[index];
      for (let i = 0; i < map[char].length; i++) {
        result.push(prefix + map[char][i]);
      }
    } else {
      let char = digits[index];
      for (let i = 0; i < map[char].length; i++) {
        letter(digits, index+1, prefix+map[char][i]);
      }
    }
  })(digits, 0, '');
  return result;
};



var digits = '234';
console.log(letterCombinations(digits));