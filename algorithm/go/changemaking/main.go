package main

import (
	"fmt"
	"math"
)

func ChangeMaking(d []int, n int) int {
	f := make([]int, n+1)

	f[0] = 0

	// i 是面额，f[i] 是面额为 i 时的最优解问题
	// d[0] = 1 确保了问题一定是有解的
	for i := 1; i < n+1; i++ {
		// 这里最大值就不取无穷了
		temp := math.MaxInt32
		j := 0
		for ; j < len(d) && i >= d[j]; j++ {
			temp = int(math.Min(float64(f[i-d[j]]), float64(temp)))
		}
		f[i] = temp+1
	}
	return f[n]
}

func main() {
	d := []int{1,3,4}
	n := 100
	fmt.Println(ChangeMaking(d, n))
}