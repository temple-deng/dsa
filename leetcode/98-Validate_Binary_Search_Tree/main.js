var isValidBST = function (root) {
  var arr = [];
  (function inOrder(node) {
    if (!node) {
      return;
    }
    inOrder(node.left);
    arr.push(node.val);
    inOrder(node.right);
  }(root))
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i-1]) {
      return false;
    }
  }
  return true;
};