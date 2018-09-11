package main

import (
	"fmt"
)

func isAnagram(s string, t string) bool {
	sL := len(s)
	tL := len(t)

	if sL != tL {
		return false
	}

	freqMap := make(map[uint8]int)

	for i := 0; i < sL; i++ {
		freqMap[s[i]]++
	}

	for i := 0; i < tL; i++ {
		if freq, ok := freqMap[t[i]]; ok {
			if freq == 1 {
				delete(freqMap, t[i])
			} else {
				freqMap[t[i]]--
			}
		} else {
			return false
		}
	}

	return len(freqMap) == 0
}

func main() {
	s := "a"
	t := "ab"
	fmt.Println(isAnagram(s, t))
}