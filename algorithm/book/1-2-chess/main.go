package main

import (
	"fmt"
)

const BITS_LENGTH = 4

// 这里貌似必须声明成变量
var FULL_MASK byte = 255
var LMASK = FULL_MASK << BITS_LENGTH
var RMASK = FULL_MASK >> BITS_LENGTH

func LSET(b byte, n int) {
	
}


func main() {
	fmt.Println("Brute Force")
	bruteForce()
}

func bruteForce() {
	for i := 1; i <= 9; i++ {
		for j := 1; j <= 9; j++ {
			if i % 3 != j % 3 {
				fmt.Printf("A = %d, B = %d\n", i, j)
			}
		}
	}
}