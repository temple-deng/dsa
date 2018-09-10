var removeElement = function(nums, val) {
  var n = nums.length;
  
  let k = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] !== val) {
      if (i !== k) {
        nums[k] = nums[i];
        nums[i] = 0;
      }
      k++;
    }
  }
  return k;
};