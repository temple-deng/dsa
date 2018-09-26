package main

import (
	"fmt"
)

const BITS_LENGTH = 4

// 这里貌似必须声明成变量
// 但这里是否已经违背了只能使用一个变量的限制
var FULL_MASK byte = 255
var LMASK = FULL_MASK << BITS_LENGTH
var RMASK = FULL_MASK >> BITS_LENGTH

// 而且这里函数算不算也使用了额外的变量？？？
func LSET(b *byte, n byte) {
 	*b = (*b & RMASK) | (n << BITS_LENGTH)
}

func LGET(b *byte) byte {
	return (*b & LMASK) >> BITS_LENGTH
}

func RSET(b *byte, n byte) {
	*b = *b & LMASK | n
}

func RGET(b *byte) byte {
	return *b & RMASK
}


func chess() {
	var i byte
	for LSET(&i, 1); LGET(&i) <= 9; LSET(&i, LGET(&i)+1) {
		for RSET(&i, 1); RGET(&i) <= 9; RSET(&i, RGET(&i) + 1) {
			if LGET(&i) % 3 != RGET(&i) % 3 {
				fmt.Printf("A = %d, B = %d\n", LGET(&i), RGET(&i))
			}
		}
	} 
}

func main() {
	fmt.Println("Brute Force")
	bruteForce()
	fmt.Println("Byte Method")
	chess()
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