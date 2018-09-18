/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  var count = 0;
  var result;
  (function inOrder(node) {
    if (node === null) {
      return;
    }
    inOrder(node.left);
    count++;
    if (count === k) {
      result = node.val;
      return
    }
    inOrder(node.right);
  })(root)
  return result;
};