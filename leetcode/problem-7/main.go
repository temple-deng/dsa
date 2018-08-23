// 给定一个 32 位有符号整数，将整数中的数字进行反转。
package main

import (
	"fmt"
	"math"
	"strconv"
)

func reverse(x int) int {
	y := x
	if x < 0 {
		y = -x
	}

	strs := strconv.Itoa(y)
	length := len(strs)
	sum := 0
	for i := 0; i < length; i++ {
		val, _ := strconv.Atoi(strs[i:i+1])
		sum += val * int(math.Pow10(i))
		if sum > math.MaxInt32 {
			return 0
		}
	}

	if x < 0 {
		sum = -sum
	}
	return sum
}

func main() {
	fmt.Println(reverse(123))
	fmt.Println(reverse(-123))
	fmt.Println(reverse(120))
	fmt.Println(reverse(1534236469))
}