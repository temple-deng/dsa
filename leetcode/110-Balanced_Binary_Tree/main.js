var isBalanced = function(root) {
  if (root === null) {
    return true;
  }

  if (!isBalanced(root.left) || !isBalanced(root.right)) {
    return false;
  }

  return Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1;
};

function getHeight(node) {
  if (node === null) {
    return 0;
  }

  const leH = getHeight(node.left);
  const riH = getHeight(node.right);
  return Math.max(leH, riH) + 1;
}