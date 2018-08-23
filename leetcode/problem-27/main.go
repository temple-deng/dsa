// 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

// 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

package main

import (
	"fmt"
)

func removeElement(nums []int, val int) int {
	length := len(nums)
    if length == 0 {
		return 0
	}
	i := 0
	j := length - 1
	for ; i < j; {
		if nums[i] == val {
			if nums[j] != val {
				swap(nums, i, j)
				i++
				j--
			} else {
				j--
			}
		} else {
			i++	
		}
	}
    if nums[j] == val {
        return j
    }
    return j + 1
}

func swap(nums []int, i, j int) {
	temp := nums[i]
	nums[i] = nums[j]
	nums[j] = temp
}

func main() {
	fmt.Println(removeElement([]int{0,1,2,2,3,0,4,2}, 2))
}