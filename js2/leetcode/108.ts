/**
 * @file 108. 将有序数组转换为二叉搜索树
 * @link https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

export function sortedArrayToBST(nums: number[]): TreeNode | null {
    return buildBST(nums, 0, nums.length - 1);
};

function buildBST(nums: number[], left: number, right: number): TreeNode | null {
    if (left > right) {
        return null;
    }
    if (left === right) {
        return {val: nums[left], left: null, right: null};
    }

    const mid = Math.floor((right - left) / 2) + left;
    return {
        val: nums[mid],
        left: buildBST(nums, left, mid - 1),
        right: buildBST(nums, mid + 1, right)
    };
}