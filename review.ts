export {}

// 1
function twoSum(nums: number[], target: number): number[] {
    if (nums.length < 2) {
        return [];
    }

    const map = new Map();
    for (const [index, val] of nums.entries()) {
        if (map.has(val)) {
            return [map.get(val), index];
        } else {
            map.set(target - val, index);
        }
    }

    return [];
}

// 2
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let carry = 0;

    let cur1 = l1;
    let cur2 = l2;
    let prev1 = null;

    while (cur1 && cur2) {
        let sum = cur1.val + cur2.val + carry;
        if (sum >= 10) {
            sum = sum - 10;
            carry = 1;
        } else {
            carry = 0;
        }
        cur1.val = sum;
        prev1 = cur1;
        cur1 = cur1.next;
        cur2 = cur2.next;
    }

    if (!cur1 && !cur2) {
        if (carry) {
            prev1.next = new ListNode(1, null);
        }
        return l1;
    }

    if (!cur1) {
        prev1.next = cur2;
    }
    let cur = prev1.next;

    while (carry && cur) {
        let sum = cur.val + carry;
        if (sum >= 10) {
            sum = sum - 10;
            carry = 1;
        } else {
            carry = 0;
        }
        cur.val = sum;
        prev1 = cur;
        cur = cur.next;
    }

    if (carry) {
        prev1.next = new ListNode(1, null);
    }

    return l1;
};


// 3
function lengthOfLongestSubstring(s: string): number {
    if (!s.length) {
        return 0;
    }

    const map = new Map<string, number>();
    let max = 0;
    let start = 0;
    let end = 0;
    while (end < s.length) {
        const char = s[end];
        if (map.has(char)) {
            // 出现了重复字符，修改区间，更新 map
            const firstIndex = map.get(char);
            for (let i = start; i <= firstIndex; i++) {
                map.delete(s[i]);
            }
            start = firstIndex + 1;
        }
        map.set(char, end);
        max = Math.max(max, end - start + 1);
        end++;
    }

    return max;
};

// 4 @TODO:

// 先写一个 O(m + n) 的解法 
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    let m = nums1.length;
    let n = nums2.length;
    let midIndex = Math.floor((m + n) / 2);
    let prev;
    let cur;
    let k = 0;
    let j = 0;

    for (let i = 0; i <= midIndex; i++) {
        prev = cur;
        if (k >= m) {
            cur = nums2[j];
            j++;
        } else if (j >= n) {
            cur = nums1[k];
            k++;
        } else if (nums1[k] <= nums2[j]) {
            cur = nums1[k];
            k++
        } else {
            cur = nums2[j];
            j++;
        }
    }

    if ((m + n) % 2) {
        return cur;
    } else {
        return (cur + prev) / 2;
    }
};

// 5

function longestPalindrome(s: string): string {
    let max = 1;
    let maxS = s[0];
    let n = s.length;

    // 先从字符开始
    for (let i = 0; i < n; i++) {
        let l = i - 1;
        let r = i + 1;
        while (l >= 0 && r < n) {
            if (s[l] === s[r]) {
                l--;
                r++;
            } else {
                break;
            }
        }
        if (r - l - 1 > max) {
            max = r - l - 1;
            maxS = s.slice(l + 1, r);
        }
    }

    // 然后从缝隙开始，即偶数的回文串
    for (let i = 0; i < n; i++) {
        let l = i - 1;
        let r = i;
        while (l >= 0 && r < n) {
            if (s[l] === s[r]) {
                l--;
                r++;
            } else {
                break;
            }
        }
        if (r - l - 1 > max) {
            max = r - l - 1;
            maxS = s.slice(l + 1, r);
        }
    }

    return maxS;
};

function isPalind(s: string, start: number, end: number): boolean {
    while (start <= end) {
        if (s[start] !== s[end]) {
            return false;
        }
    }
    return true;
}

// 6
function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s;
    }

    let top = 0;
    let bottom = numRows - 1;
    let index = 0;
    let lineNum = 0;
    let dir = 'b';
    const arr = new Array(numRows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = [];
    }

    while (index < s.length) {
        arr[lineNum].push(s[index]);
        if (dir === 'b') {
            if (lineNum === bottom) {
                dir = 't';
                lineNum--;
            } else {
                lineNum++;
            }
        } else {
            if (lineNum === top) {
                dir = 'b';
                lineNum++;
            } else {
                lineNum--;
            }
        }
        index++;
    }
    return arr.map(val => val.join('')).join('');
};

// 9 @TODO
function isPalindrome(x: number): boolean {
    const str = x.toString();
    const n = str.length;
    let i = Math.floor(n / 2);
    let l;
    let r

    if (n % 2) {
        // 奇数长度
        l = i - 1;
        r = i + 1;
    } else {
        // 偶数长度
        l = i - 1;
        r = i;
    }

    while(l >= 0 && r < n) {
        if (str[l] !== str[r]) {
            return false;
        } else {
            l--;
            r++;
        }
    }
    return true;
};

// 11

function maxArea(height: number[]): number {
    let max = 0;
    let l = 0;
    let r = height.length - 1;

    while (l < r) {
        max = Math.max(max, (r - l) * Math.min(height[r], height[l]));
        if (height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
    }

    return max;
};

// 14
function longestCommonPrefix(strs: string[]): string {
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];

        for (let j = 1; j < strs.length; j++) {
            const str = strs[j];
            if (str[i] !== char) {
                return strs[0].slice(0, i);
            }
        }
    }
    return strs[0];
};

// 15
function threeSum(nums: number[]): number[][] {
    const res: number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) {
        const sum = -nums[i];
        const map = new Map();
        const set = new Set();

        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        for (let j = i + 1; j < nums.length; j++) {
            const n = nums[j];
            if (map.has(n) && !set.has(n)) {
                set.add(n);
                res.push([nums[i], map.get(n), n]);
            } else {
                map.set(sum - n, n);
            }
        }
    }

    return res;
};

var numMap: string[][] = [
    [],
    [],
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z'],
];

function letterCombinations(digits: string): string[] {
    if (digits.length === 0) {
        return [];
    }

    if (digits.length === 1) {
        return numMap[digits[0]];
    }

    const subComb = letterCombinations(digits.slice(1));
    const firstCharArr = numMap[digits[0]] as string[];
    const res = [];
    for (let i = 0; i < firstCharArr.length; i++) {
        for (let j = 0; j < subComb.length; j++) {
            res.push([firstCharArr[i], ...subComb[j]].join(''));
        }
    }

    return res;
};

// 18 @TODO
function fourSum(nums: number[], target: number): number[][] {
    return []
};

// 19
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (head === null) {
        return null;
    }
    let fast = head;
    let i = 0;

    while (i < n && fast) {
        fast = fast.next;
        i++;
    }
    if (fast === null) {
        return head.next;
    }

    let slow = head;

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    return head;
};

// 21

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }

    let cur1 = list1;
    let cur2 = list2;
    let cur;
    let head;
    if (cur1.val <= cur2.val) {
        cur = head = cur1;
        cur1 = cur1.next;
    } else {
        cur = head = cur2;
        cur2 = cur2.next;
    }

    while (cur1 || cur2) {
        if (!cur1) {
            // cur1 遍历完了
            cur.next = cur2;
            cur2 = cur2.next;
            cur = cur.next;
            break;
        } else if (!cur2) {
            cur.next = cur1;
            cur1 = cur1.next;
            cur = cur.next;
            break;
        } else if (cur1.val <= cur2.val) {
            cur.next = cur1;
            cur1 = cur1.next;
            cur = cur.next;
        } else {
            cur.next = cur2;
            cur2 = cur2.next;
            cur = cur.next;
        }
    }

    return head;
};

// 23

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    return lists.reduce((prev, cur) => {
        return mergeTwoLists(prev, cur);
    }, null);
};

function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    let dummy = {next: head};
    let prev = dummy;
    let cur = prev.next;
    while (cur && cur.next) {
        let next = cur.next;
        cur.next = next.next;
        next.next = cur;
        prev.next = next;
        prev = cur;
        cur = cur.next;
    }
    return dummy.next;
};

// 26
function removeDuplicates(nums: number[]): number {
    let end = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[end] !== nums[i]) {
            end++;
            nums[end] = nums[i];
        }
    }

    return end + 1;
};

// 27 
function removeElement(nums: number[], val: number): number {
    let end = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            end++;
            nums[end] = nums[i];
        }
    }

    return end + 1;
};

// 33
function search2(nums: number[], target: number): number {
    // O(n) 解法，哈哈
    // return nums.findIndex(val => val === target);
    let left = 0;
    let right= nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        const nMid = nums[mid];
        const nLeft = nums[left];
        const nRight = nums[right];
        if (target === nMid) {
            return mid;
        }
        if (nMid >= nLeft && nMid >= nRight) {
            // 左边半截
            if (target > nMid) {
                left = mid + 1;
            } else if (target >= nLeft) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // 右边半截
            if (target < nMid) {
                right = mid - 1;
            } else if (target <= nRight) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
};

// 34
function searchRange(nums: number[], target: number): number[] {
    // O(n)
    // let i = 0;
    // for (; i < nums.length; i++) {
    //     if (nums[i] === target) {
    //         break;
    //     }
    // }

    // if (i === nums.length) {
    //     return [-1, -1];
    // }

    // let start = i;
    // i++;
    // for (; i < nums.length; i++) {
    //     if (nums[i] !== target) {
    //         break;
    //     }
    // }
    // return [start, i - 1];

    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((r - l) / 2 + l);
        if (nums[mid] === target) {
            let start = mid - 1;
            let end = mid + 1;
            while (start >= 0 && nums[start] === target) {
                start--;
            }
            while (end < nums.length && nums[end] === target) {
                end++;
            }
            return [start + 1, end - 1];
        } else if (target < nums[mid]) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return [-1, -1];
};

// 35
function searchInsert(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((r - l) / 2) + l;
        if (target === nums[mid]) {
            return mid;
        } else if (target < nums[mid]) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return r;
};

// 36-41 @TODO
function isValidSudoku(board: string[][]): boolean {

};

// 45 贪心是更好的方法，可是我不会，嘿嘿
function jump(nums: number[]): number {
    let n = nums.length;
    let dp = [0];
    // dp[i] = Math.min(dp[0], dp[1], ..., dp[k] ...dp[i - 1]) + 1 and k + nums[k] >= dp[i]
    for (let i = 1; i < n; i++) {
        let min = Infinity;
        for (let j = 0; j < i; j++) {
            if (nums[j] + j >= i) {
                min = Math.min(min, dp[j] + 1);
            }
        }
        dp[i] = min;
    }
    return dp.pop();
};

// 46

function permute(nums: number[]): number[][] {
    const n = nums.length;
    if (n === 0) {
        return [];
    }
    if (n === 1) {
        return [nums];
    }
    let res = [];
    for (let i = 0; i < n; i++) {
        const subPermute = permute(nums.slice(0, i).concat(nums.slice(i + 1)));

        for (let j = 0; j < subPermute.length; j++) {
            res.push([nums[i], ...subPermute[j]]);
        }
    }
    return res;
};

// 47-54 @TODO
function permuteUnique(nums: number[]): number[][] {
    // 难点在如何去重
    // 假设我们先排个序
};

// 55
function canJump(nums: number[]): boolean {
    if (nums.length <= 1) {
        return true;
    }
    let maxIndex = nums[0];
    let i = 1;
    while (i < nums.length && maxIndex >= i) {
        maxIndex = Math.max(maxIndex, nums[i] + i);
        if (maxIndex >= nums.length - 1) {
            return true;
        }
        i++;
    }
    return false;
};

// 56
function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        } else if (a[0] > b[0]) {
            return 1;
        } else {
            a[1] - b[1];
        }
    });

    const res: number[][] = intervals.reduce((prev, curr) => {
        if (prev.length) {
            const last = prev[prev.length - 1];
            if (curr[0] > last[1]) {
                prev.push(curr);
            } else {
                last[1] = Math.max(last[1], curr[1]);
            }
        } else {
            prev.push(curr);
        }
        return prev;
    }, [] as number[][]);
    return res;
};

// 58
function lengthOfLastWord(s: string): number {
    let end = s.length - 1;
    if (!s.length) {
        return 0;
    }

    while (end >= 0 && s[end] === ' ') {
        end--;
    }
    if (end === -1) {
        return 0;
    }
    let start = end;
    while (start >= 0 && s[start] !== ' ') {
        start--;
    }
    if (start === -1) {
        return end + 1;
    }
    return end - start;
};

// 58 @TODO 之后的 easy

// 66
function plusOne(digits: number[]): number[] {
    let carry = 1;
    const n = digits.length;

    for (let i = n - 1; i >= 0; i--) {
        let sum = digits[i] + carry;
        if (sum >= 10) {
            sum -= 10;
            carry = 1;
        } else {
            carry = 0;
        }
        digits[i] = sum;
    }

    if (carry) {
        digits.unshift(1);
    }
    return digits
};

// 70
function climbStairs(n: number): number {
    let dp = [1, 1, 2];
    if (n <= 2) {
        return dp[n];
    }

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp.pop();
};

// 83
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }
    let dummy = {next: head, val: null};
    let prev = dummy;
    let cur = prev.next;
    while (cur) {
        while (cur && cur.val === prev.val) {
            cur = cur.next;
        }
        prev.next = cur;
        prev = prev.next;
        if (cur) {
            cur = cur.next;
        }
    }
    return dummy.next;
};

// 88 

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let s1Dup = nums1.slice(0, m);
    let i = 0;
    let j = 0;
    let k = 0;
    while (k < m + n) {
        if (i >= m) {
            nums1[k] = nums2[j];
            j++;
        } else if (j >= n) {
            nums1[k] = s1Dup[i];
            i++;
        } else if (s1Dup[i] <= nums2[j]) {
            nums1[k] = s1Dup[i];
            i++;
        } else {
            nums1[k] = nums2[j];
        }
        k++;
    }
};

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

// 94
function inorderTraversal(root: TreeNode | null): number[] {
    const ret = [];
    if (root) {
        ret.push(...inorderTraversal(root.left));
        ret.push(root.val);
        ret.push(...inorderTraversal(root.right));
    }

    return ret;
};

// 100
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null) {
        return q === null;
    }
    if (q === null) {
        return false;
    }
    if (p.val !== q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// 104
function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// 108
function sortedArrayToBST(nums: number[]): TreeNode | null {
    return sortedArrayToBSTSub(nums, 0, nums.length - 1);
};

function sortedArrayToBSTSub(nums: number[], l: number, r: number): TreeNode | null {
    if (l > r) {
        return null
    }
    if (l === r) {
        return new TreeNode(nums[l]);
    }

    const mid = Math.floor((r - l) / 2) + l;
    const root = new TreeNode(nums[mid], null, null);
    const left = sortedArrayToBSTSub(nums, l, mid - 1);
    const right = sortedArrayToBSTSub(nums, mid + 1, r);
    root.left = left;
    root.right = right;
    return root;
}

// 110
function isBalanced(root: TreeNode | null): boolean {
    if (root === null) {
        return true;
    }
    return isBalanced(root.left) && isBalanced(root.right) && Math.abs(treeHeight(root.left) - treeHeight(root.right)) <= 1;
};

function treeHeight(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return Math.max(treeHeight(root.left), treeHeight(root.right)) + 1;
}

// 111 
function minDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    if (root.left && root.right) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
    }
    if (root.left) {
        return minDepth(root.left) + 1;
    }
    if (root.right) {
        return minDepth(root.right) + 1;
    }
    return 1;
};

// 112
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) {
        return false;
    }
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

// 113 @TODO
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    // 这不是排列问题，首先要确认是个解，才能加进去
    // return findPathSum()
};

// 118
function generate(numRows: number): number[][] {
    if (numRows === 1) {
        return [[1]];
    }
    const ret = [[1], [1, 1]];
    let prev = [1, 1];
    for (let i = 3; i <= numRows; i++) {
        const arr = [1];
        for (let j = 1; j < i - 1; j++) {
            arr.push(prev[j - 1] + prev[j]);
        }
        arr.push(1);
        ret.push(arr)
        prev = arr
    }
    return ret;
};

// 121
function maxProfit(prices: number[]): number {
    let max = 0;
    let minPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > minPrice) {
            max = Math.max(max, prices[i] - minPrice);            
        }
        minPrice = Math.min(minPrice, prices[i]);
    }
    return max;
};

// 125
function isPalindrome2(s: string): boolean {
    s = s.replace(/[^\w_]|_/g, '').toLowerCase();
    let l = 0;
    let r = s.length - 1;
    while (l <= r) {
        if (s[l] !== s[r]) {
            return false;
        }
        l++;
        r--;
    }
    return true;
};

// 141
function hasCycle(head: ListNode | null): boolean {
    if (head === null) {
        return false;
    }
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
};

// 144
function preorderTraversal(root: TreeNode | null): number[] {
    const ret = [];
    if (root) {
        ret.push(root.val);
        ret.push(...preorderTraversal(root.left));
        ret.push(...preorderTraversal(root.right))
    }
    return ret;
};

// 145
function postorderTraversal(root: TreeNode | null): number[] {
    const ret = [];
    if (root) {
        ret.push(...postorderTraversal(root.left));
        ret.push(...postorderTraversal(root.right))
        ret.push(root.val);
    }
    return ret;
};

// 155 @TODO
class MinStack {
    
}

// 167
function twoSum2(numbers: number[], target: number): number[] {
    let l = 0;
    let r = numbers.length - 1;

    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (target === sum) {
            return [l + 1, r + 1];
        } else if (target < sum) {
            r--
        } else {
            l++;
        }
    }
    return [];
};

// 202
function isHappy(n: number): boolean {
    if (n === 1) {
        return true;
    }
    let str = n.toString();
    const set = new Set();
    while (true) {
        if (set.has(str)) {
            return false;
        }
        set.add(str);
        let num = 0;
        for (let char of str) {
            num += Math.pow(Number(char), 2);
        }
        if (num === 1) {
            return true;
        }
        str = num.toString();
    }
};

// 203
function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (head === null) {
        return null;
    }
    let dummy = {next: head};
    let prev = dummy;
    let cur = prev.next;

    while (cur) {
        if (cur.val === val) {
            prev.next = cur.next;
            cur = cur.next;
        } else {
            prev = prev.next;
            cur = cur.next;
        }
    }
    return dummy.next;
};

// 205
function isIsomorphic(s: string, t: string): boolean {
    const sMap = new Map();
    const tMap = new Map();

    if (s.length !== t.length) {
        return false;
    }

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        if (sMap.has(charS) && sMap.get(charS) !== charT) {
            return false;
        } else if (!sMap.has(charS)) {
            if (tMap.has(charT) && tMap.get(charT) !== charS) {
                return false;
            }
            sMap.set(charS, charT);
            tMap.set(charT, charS);
        }
    }
    return true;
};

// 206 @TODO
function reverseList(head: ListNode | null): ListNode | null {

};

// 207
function containsDuplicate(nums: number[]): boolean {
    const set = new Set();
    for (const val of nums.values()) {
        if (set.has(val)) {
            return true;
        }
        set.add(val);
    }
    return false;
};

// 219
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map = new Map();

    for (const [index, val] of nums.entries()) {
        if (map.has(val)) {
            const i = map.get(val);
            if (index - i <= k) {
                return true;
            }
        }
        map.set(val, index);
    }
    return false;
};

// 226

function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }
    const {left, right} = root;
    root.left = invertTree(right);
    root.right = invertTree(left);
    return root;
};

// 234
function isPalindrome3(head: ListNode | null): boolean {
    if (!head || !head.next) {
        return true;
    }

    const arr = [];
    let cur = head;
    while (cur) {
        arr.push(cur.val);
        cur = cur.next;
    }

    let l = 0;
    let r = arr.length - 1;
    while (l <= r) {
        if (arr[l] !== arr[r]) {
            return false;
        }
        l++;
        r--;
    }
    return true;
};

// 235
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root) {
        return root;
    }
    if (!p) {
        return q;
    }
    if (!q) {
        return p;
    }
    if (root.val === p.val || root.val === q.val) {
        return root;
    }
    const max = Math.max(p.val, q.val);
    const min = Math.min(p.val, q.val);
    if (root.val > max) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < min) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};

// 237
function deleteNode(root: ListNode | null): void {
    if (root === null) {
        return null
    }
    const next = root.next;
    root.val = next.val;
    root.next = next.next;
    next.next = null;
};

// 242
function isAnagram(s: string, t: string): boolean {
    const map = new Map();
    if (s.length !== t.length) {
        return false;
    }

    for (const char of s) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    for (const char of t) {
        if (!map.has(char)) {
            return false;
        } else {
            map.set(char, map.get(char) - 1);
            if (map.get(char) === 0) {
                map.delete(char);
            }
        }
    }
    return true;
};

// 257
function binaryTreePaths(root: TreeNode | null): string[] {
    if (root === null) {
        return [];
    }
    const ret = [];
    if (root.left) {
        const leftPath = binaryTreePaths(root.left);
        for (const str of leftPath.values()) {
            ret.push(`${root.val}->${str}`);
        }
    }
    if (root.right) {
        const rightPath = binaryTreePaths(root.right);
        for (const str of rightPath.values()) {
            ret.push(`${root.val}->${str}`);
        }
    }
    if (!root.left && !root.right) {
        ret.push(`${root.val}`);
    }
    return ret;
};

// 268
function missingNumber(nums: number[]): number {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (i !== nums[i]) {
            return i;
        }
    }
    return nums.length;
};

function swap(arr: number[], i: number, j:number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 283
function moveZeroes(nums: number[]): void {
    // [0, end] 是非0
    // [end + 1, i) 是 0
    // [i, n - 1] 是未遍历
    let end = -1;
    for (let i = 0; i < nums.length;i++) {
        // 这里是该有个优化措施的
        if (nums[i] !== 0) {
            end++;
            swap(nums, i, end);
        }
    }
};

// 290
function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(/\s+/g);
    const pMap = new Map();
    const sMap = new Map();

    if (pattern.length !== words.length) {
        return false;
    }
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        if (pMap.has(char)) {
            if (pMap.get(char) !== word) {
                return false;
            }
        } else {
            if (sMap.has(word)) {
                return false;
            }
            pMap.set(char, word);
            sMap.set(word, char);
        }
    }

    return true;
};

// 344
function reverseString(s: string[]): void {
    let l = 0;
    let r = s.length - 1;
    while (l < r) {
        const temp = s[l];
        s[l] = s[r];
        s[r] = temp;
        l++;
        r--
    }
};

// 345
function reverseVowels(s: string): string {
    const set = new Set('aAeEiIoOuU');
    let l = 0;
    let r = s.length - 1;
    const arr = s.split('');

    while (l < r) {
        while (l < r && !set.has(s[l])) {
            l++;
        }
        while (l < r && !set.has(s[r])) {
            r--;
        }
        if (l < r) {
            const temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++;
            r--;
        }
    }
    return arr.join('');
};

// 349
function intersection(nums1: number[], nums2: number[]): number[] {
    const set = new Set();
    for (const val of nums1.values()) {
        set.add(val);
    }
    const set2 = new Set<number>();
    for (const val of nums2.values()) {
        if (set.has(val)) {
            set2.add(val);
        }
    }
    return Array.from(set2);
};

// 350
function intersect(nums1: number[], nums2: number[]): number[] {
    const map1 = new Map<number, number>();

    for (const val of nums1.values()) {
        if (map1.has(val)) {
            map1.set(val, map1.get(val) + 1);
        } else {
            map1.set(val, 1);
        }
    }
    const ret: number[] = [];
    for (const val of nums2.values()) {
        if (map1.has(val)) {
            ret.push(val);
            map1.set(val, map1.get(val) - 1);
            if (map1.get(val) === 0) {
                map1.delete(val)
            }
        }
    }
    return ret;
};


// 383
function canConstruct(ransomNote: string, magazine: string): boolean {
    const map = new Map();

    for (const char of magazine) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    for (const char of ransomNote) {
        if (map.has(char)) {
            map.set(char, map.get(char) - 1);
            if (map.get(char) === 0) {
                map.delete(char);
            }
        } else {
            return false;
        }
    }

    return true;
};

// 387
function firstUniqChar(s: string): number {
    const map = new Map();

    for (const char of s) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) {
            return i
        }
    }
    return -1;
};

// 404 
function sumOfLeftLeaves(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    let sum = 0;
    if (root.left) {
        if (root.left.left === null && root.left.right === null) {
            sum += root.left.val;
        } else {
            sum += sumOfLeftLeaves(root.left);
        }
    }
    if (root.right) {
        sum += sumOfLeftLeaves(root.right);
    }
    return sum;
};

// 412

function fizzBuzz(n: number): string[] {
    const arr = ["1","2","Fizz","4","Buzz"];
    if (n <= 5) {
        return arr.slice(0, n);
    }
    for (let i = 6; i <= n; i++) {
        let str = '';
        if (i % 3 === 0) {
            str += 'Fizz';
            i % 5 === 0 && (str += 'Buzz')
        } else if (i % 5 === 0) {
            str += 'Buzz';
        } else {
            str = '' + i;
        }
        arr.push(str);
    }
    return arr;
};

// 557
function reverseWords(s: string): string {
    let start = 0;
    let end = 0;
    const arr = [];

    while (end < s.length) {
        while (end < s.length && s[end] !== ' ') {
            end++;
        }
        let spaceIndex = end;
        end--;
        while (start <= end) {
            arr.push(s[end]);
            end--;
        }
        end = spaceIndex;
        while (end < s.length && s[end] === ' ') {
            arr.push(' ');
            end++;
        }
        start = end;
    }

    return arr.join('');
};

// 563
function findTilt(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    if (!root.left && !root.right) {
        return 0;
    }
    const tilt = Math.abs(treeSum(root.left) - treeSum(root.right)) + findTilt(root.left) + findTilt(root.right);
    return tilt;
};

function treeSum(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return root.val + treeSum(root.left) + treeSum(root.right);
}

// 566
function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const m = mat.length;
    const n = mat[0].length;
    const sum = m * n;
    if (sum !== r * c) {
        return mat;
    }
    const ret = new Array(r)
    for (let i = 0; i < r; i++) {
        ret[i] = new Array(c);
    }
    let rN = 0;
    let cN = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ret[rN][cN] = mat[i][j];
            cN++;
            if (cN === c) {
                cN = 0;
                rN++;
            }
        }
    }

    return ret;
};

// 575
function distributeCandies(candyType: number[]): number {
    const set = new Set();
    for (const type of candyType.values()) {
        set.add(type);
    }

    const size = set.size;
    const n = candyType.length / 2;
    return Math.min(n, size);
};

// 598
function maxCount(m: number, n: number, ops: number[][]): number {
    let minM = m;
    let minN = n;

    for (let i = 0; i < ops.length; i++) {
        const [a, b] = ops[i];
        minM = Math.min(minM, a);
        minN = Math.min(minN, b);
    }

    return minN * minM;
};

// 617
function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (root1 === null) {
        return root2;
    }
    if (root2 === null) {
        return root1;
    }

    root1.val += root2.val;
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);
    return root1;
};

// 674
function findLengthOfLCIS(nums: number[]): number {
    let max = 1;
    let l = 0;
    let r = 1;

    while (r < nums.length) {
        if (nums[r] > nums[r - 1]) {
            r++;
            max = Math.max(max, r - l);
        } else {
            l = r;
            r++;
        }
    }
    return max;
};

// 746
function minCostClimbingStairs(cost: number[]): number {
    let dp = [0, 0];
    for (let i = 2; i < cost.length; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }
    const n = cost.length;
    return Math.min(dp[n - 1] + cost[n - 1], dp[n - 2] + cost[n - 2]);
};

// 876
function middleNode(head: ListNode | null): ListNode | null {
    let cur = head;
    let num = 0;

    while (cur) {
        cur = cur.next;
        num++;
    }
    const mid = Math.floor(num / 2);
    let i = 0;
    cur = head;
    while (i < mid) {
        i++;
        cur = cur.next;
    }
    return cur;
};

// 896
function isMonotonic(nums: number[]): boolean {
    const n = nums.length;
    if (n === 1) {
        return true;
    }
    const diff = nums[n - 1] - nums[0];
    if (diff === 0) {
        for (let i = 1; i < n; i++) {
            if (nums[i] !== nums[i - 1]) {
                return false;
            }
        }
        return true;
    } else if (diff > 0) {
        for (let i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                return false;
            }
        }
        return true;
    } else {
        for (let i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                return false;
            }
        }
        return true;
    }
};

// 977
function sortedSquares(nums: number[]): number[] {
    let n = nums.length;

    let i = 0;
    while (i < n && nums[i] < 0) {
        i++;
    }

    if (i === 0) {
        return nums.map(n => n * n);
    } else {
        let l = i - 1;
        let r = i;
        const ret = [];
        while (l >= 0 || r < n) {
            if (l < 0) {
                ret.push(nums[r] * nums[r]);
                r++;
            } else if (r >= n) {
                ret.push(nums[l] * nums[l]);
                l--;
            } else if (Math.abs(nums[l]) <= Math.abs(nums[r])) {
                ret.push(nums[l] * nums[l]);
                l--;
            } else {
                ret.push(nums[r] * nums[r]);
                r++;
            }
        }
        return ret;
    }
};

// 1002
function commonChars(words: string[]): string[] {
    let map = new Map<string, number>();
    const firstWord = words[0];
    for (const char of firstWord) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    for (let i = 1; i < words.length; i++) {
        const insectMap = new Map();
        const w = words[i];
        for (const char of w) {
            if (map.has(char)) {
                if (insectMap.has(char)) {
                    insectMap.set(char, insectMap.get(char) + 1);
                } else {
                    insectMap.set(char, 1);
                }
                map.set(char, map.get(char) - 1);
                if (map.get(char) === 0) {
                    map.delete(char);
                }
            }
        }
        map = insectMap;
    }
    const arr = [];
    for (const [key, value] of map.entries()) {
        let str = key.repeat(value);
        arr.push(...str);
    }
    return arr;
};

// 1567
function getMaxLen(nums: number[]): number {
    const n = nums.length;
    let minusNum = 0;
    let zeroNum = 0;
    // for (let i = 0; i < n; i++) {
    //     if (nums)
    // }
};