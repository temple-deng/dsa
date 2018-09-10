var removeDuplicates = function(nums) {
  var n = nums.length;
  if (n === 0) {
    return 0;
  }

  var k = 1;
  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[k-1]) {
      if (i !== k) {
        nums[k] = nums[i];
        nums[i] = 0;
      }
      k++;
    }
  }
  return k;
};