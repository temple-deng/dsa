package main

import (
	"fmt"
	"strings"
)

func wordPattern(pattern string, str string) bool {
	arr := strings.Split(str, " ")
	sl := len(arr)
	pl := len(pattern)

	if sl != pl {
		return false
	}

	
	auxMap := make(map[uint8]string)
	set := make(map[string]bool)

	for i := 0; i < sl; i++ {
		char := pattern[i]
		desc := arr[i]
		val, mapOk := auxMap[char]
		_, setOk := set[desc]
		if !mapOk && !setOk {
			auxMap[char] = desc
			set[desc] = true
		} else if mapOk {
			if val != desc {
				return false
			}
		} else {
			return false
		}
	}
	return true
}

func main() {
	pattern := "abba"
	str := "dog cat cat dog"
	fmt.Println(wordPattern(pattern, str))
}