package main

import (
	"fmt"
)

func BitGet(str string, pos int) int {
	var mask uint8 = 0x80

	for i := 0; i < (pos % 8); i++ {
		mask = mask << 1
	}

	fmt.Println(str[pos / 8])
	result := mask & str[pos / 8]
	
	if result == mask {
		return 1
	}
	return 0
}

func main() {
	str := "Hello World"

	fmt.Printf("%8d\n", str[4])

	fmt.Println(BitGet(str, 39))
}