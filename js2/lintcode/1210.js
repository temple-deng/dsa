export class Solution {

    /**
     * findSubsequences
     *
     * @param nums: an integer array
     * @return: all the different possible increasing subsequences of the given array
     */
    findSubsequences(nums) {
      // Write your code here
      nums.sort((a, b) => a - b);

      return this.find(nums);
    }

    // 本质上是排列组合问题，递归回溯可能躲不过
    find(nums) {
    }
}