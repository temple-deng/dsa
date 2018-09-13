package main

import (
	"fmt"
	"math"
)

// 币值最大化问题

func CoinRow(coin []int) int {
	F := make([]int, len(coin) + 1)

	F[0] = 0
	F[1] = coin[0]

	for i := 2; i <= len(coin); i++ {
		F[i] = int(math.Max(float64(coin[i-1] + F[i-2]), float64(F[i-1])))
	}

	return F[len(coin)]
}

func main() {
	coin := []int{5, 1, 2, 10, 6, 2}
	fmt.Println(CoinRow(coin))
}