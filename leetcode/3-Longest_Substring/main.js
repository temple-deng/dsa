/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  // ascii 0~127
  var freq = Array(128);
  var n = s.length;
  var l = 0;
  var r = -1;

  for (let i = 0; i < 128; i++) {
    freq[i] = 0;
  }

  while(l < n) {
    if (freq[s[r+1]])    
  }
};