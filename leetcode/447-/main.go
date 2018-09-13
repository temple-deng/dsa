package main

import (
	"fmt"
)

func numberOfBoomerangs(points [][]int) int {
	// 然而这里外层没必要用 map
	// 用一个数组即可
	// auxMap := make(map[int](map[int]int))
	n := len(points)
	result := 0

	for i := 0; i < n; i++ {
		x := points[i]
		auxMap := make(map[int]int)
		for j := 0; j < n; j++ {
			if i != j {
				y := points[j]
				xD := x[0] - y[0]
				yD := x[1] - y[1]
				dist := xD * xD + yD * yD
				// 注意这里其实存放的是距离的平方
				auxMap[dist]++
			}
		}
		for _, count := range auxMap {
			if count >= 2 {
				result += count * (count-1)
			}
		}
	}


	return result
}

func main() {
	arr := []([]int){[]int{0, 0}, []int{1, 0}, []int{-1, 0}, []int{0,1}, []int{0,-1}}
	fmt.Println(numberOfBoomerangs(arr))
}