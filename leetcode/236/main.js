/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root.val === p.val || root.val === q.val) {
    return root;
  }

  let pInL, qInL;
  pInL = contains(root.left, p.val);
  qInL = contains(root.left, q.val);
};

function contains(node, val) {
  if (node === null) {
    return false;
  }

  if (node.val === val) {}
}