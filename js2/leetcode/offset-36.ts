/**
 * 
 */

export {}

/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {
    // 这里说白了，要一个深度优先遍历
    const res = [];

    if (root === null) {
        return null;
    }

    if (root.left === null && root.right === null) {
        root.left = root.right = root;
        return root;
    }

    inOrderTr(root, res);

    for (let i = 1; i < res.length - 1; i++) {
        res[i].left = res[i - 1];
        res[i].right === res[i + 1];
    }


    const lastIndex = res.length - 1;
    res[0].right = res[1];
    res[0].left = res[lastIndex];
    res[lastIndex].left = res[lastIndex - 1];
    res[lastIndex].right = res[0];

    return res[0];
};

function inOrderTr(root, res) {
    if (root === null) {
        return;
    }

    inOrderTr(root.left, res);
    res.push(root);
    inOrderTr(root.right, res);
}