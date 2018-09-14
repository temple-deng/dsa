/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const queue = Array();
  const result = [];

  if (root === null) {
    return result;
  }

  queue.push([0, root]);

  while(queue.length !== 0) {
    let front = queue.shift();
    let level = front[0];
    let node = front[1];

    if (result.length === level) {
      result[level] = [];
    }

    result[level].push(node.val);

    if (node.left) {
      queue.push([level+1, node.left]);
    }

    if (node.right) {
      queue.push([level+1, node.right]);
    }
  }

  return result;
};