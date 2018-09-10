var removeDuplicates = function(nums) {
  var n = nums.length;
  
  if (n < 2) {
    return n;
  }

  let k = 2;
  for (let i = 2; i < n; i++) {
    if (nums[i] !== nums[k-2]) {
      if (i !== k) {
        nums[k] = nums[i];
        nums[i] = 0;
      }
      k++;
    }
  }
  return k;
};