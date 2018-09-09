package main

import (
	// "math"
	"fmt"
	// "math"
)

func main() {
	var val1, val2 int32 = 200 * 300, 400 * 500
	fmt.Println(val2 * val1)
	var u uint32 = 4294967295

	fmt.Printf(" u = %d, v = %d", u, int32(u))
}