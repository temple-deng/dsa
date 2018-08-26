package main

import (
	"fmt"
	"../myArray"
)

func main() {
	arr, _ := myArray.NewIntArray(40)
	fmt.Printf("IntArray: length = %d, capacity = %d\n", arr.GetLength(), arr.GetCapacity())   // should be 0 40

	fmt.Printf("array is empty?: %v\n", arr.IsEmpty())
	
	// init array
	arr.Insert(0, 1)
	fmt.Printf("Insert 1 at index = 0; %s\n", arr)
	arr.Insert(1, 5)
	fmt.Printf("Insert 5 at index = 1; %s\n", arr)
	arr.Insert(1, 3)
	fmt.Printf("Insert 3 at index = 1; %s\n", arr)
	fmt.Printf("Should be [1,3,5];  %s\n", arr)	// should be [1, 3, 5]

	temp1, _ := arr.Get(1)
	temp2, _ := arr.Get(2)
	temp := temp1 + temp2
	arr.Insert(2, temp)
	fmt.Println(arr)  // should be [1, 3, 8, 5]
	arr.Set(2, 4)
	fmt.Println(arr)  // should be [1, 3, 4, 5]

	fmt.Println(arr.Contains(6))   // false

	fmt.Println(arr.Find(3))    // 1

	arr.Remove(2)

	fmt.Println(arr.String())   // should be [1, 3, 5]


	fmt.Println("-------Generic Array--------")
	garr, _ := myArray.NewArray(20)
	garr.Insert(0, 1)
	garr.Insert(1, 2)
	garr.Insert(2, "123")
	garr.Insert(2, [...]int{5,6,7})
	fmt.Println(garr)
}