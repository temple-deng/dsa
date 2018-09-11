/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  var map = new Map();
  var result = [];
  var n1 = nums1.length;
  var n2 = nums2.length;

  for (let i = 0; i < n1; i++) {
    if (map.has(nums1[i])) {
      let freq = map.get(nums1[i]) + 1;
      map.set(nums1[i], freq);
    } else {
      map.set(nums1[i], 1);
    }
  }

  for (let i = 0; i < n2; i++) {
    let val = nums2[i];
    if (map.has(val) && map.get(val) > 0) {
      result.push(val);
      let freq = map.get(val) - 1;
      map.set(val, freq);
    }
  }
  return result;
};