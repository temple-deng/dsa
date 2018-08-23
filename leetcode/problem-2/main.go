// 给定两个非空链表来表示两个非负整数。位数按照逆序方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。

// 你可以假设除了数字 0 之外，这两个数字都不会以零开头。

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

package main

import (
	"math"
	"fmt"
	"strconv"
)

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	arr1 := []int{}
	arr2 := []int{}
	for cur := l1; cur != nil; cur = cur.Next {
		arr1 = append(arr1, cur.Val)
	}
	for cur := l2; cur != nil; cur = cur.Next {
		arr1 = append(arr1, cur.Val)
	}

	lastIndex1 := len(arr1) - 1
	lastIndex2 := len(arr2) - 2
	sum1 := 0
	sum2 := 0
	for index, value := range arr1 {
		sum1 += value * int(math.Pow10(lastIndex1 - index))
	}
	for index, value := range arr2 {
		sum2 += value * int(math.Pow10(lastIndex2 - index))
	}

	arr := strconv.Itoa(sum1+sum2)
	length := len(arr)
	
}

func main() {
	fmt.Println(math.Pow10(0))
}