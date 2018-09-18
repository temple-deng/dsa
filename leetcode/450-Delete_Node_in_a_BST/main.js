/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
};

var deleteNode = function (root, key) {
  if (root == null) {
    return null;
  }

  if (root.val > key) {
    root.left = deleteNode(root.left, key);
    return root;
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key);
    return root;
  } else {

    // root.key === key, root 即被删除的那个节点
    // 没有右子树
    if (root.right === null) {
      let left = root.left;
      root.left = null;
      return left;
    }

    // 没有左子树
    if (root.left === null) {
      let right = root.right;
      root.right = null;
      return right;
    }

    // 两颗子树都在
    let successor = getMinNode(root.right);
    let left = root.left;
    let right = removeMinNode(root.right);
    successor.left = left;
    successor.right = right;
    root.left = root.right = null;
    return successor;
  }
};

function getMinNode(node) {
  if (node.left === null) {
    return node;
  }
  return getMinNode(node.left);
}

function removeMinNode(node) {
  if (node.left === null) {
    let right = node.right;
    node.right = null;
    return right;
  }

  node.left = removeMinNode(node.left);
  return node;
}

// let two = new TreeNode(2);
// let four = new TreeNode(4);
// let three = new TreeNode(3);
// three.left = two;
// three.right = four;
// let seven = new TreeNode(7);
// let six = new TreeNode(6);
// six.right = seven;
// let root = new TreeNode(5);
// root.left = three;
// root.right = six;

// // console.log(root);
// deleteNode(root, 3);
// console.log(root);