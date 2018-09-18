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
  // 暂时还不知道 root == null 要返回什么
  // 那就先假设 3 个节点都是非 null 的

  var small, big;
  if ( p.val < q.val ) {
    small = p;
    big = q;
  } else {
    small = q;
    big = p;
  }

  // 一侧一个，那就是
  if (root.val > small.val && root.val < big.val) {
    return root;
  }

  // 都在左侧
  if (root.val > big.val) {
    if (root.val == big.val || root.val == small.val) {
      return root;
    }
    return lowestCommonAncestor(root.left, p, q);
  }

  // 都在右侧
  if (root.val == big.val || root.val == small.val) {
    return root;
  }
  return lowestCommonAncestor(root.right, p, q);
};