package main

import (
	"strings"
	// "sort"
	"fmt"
	"reflect"
)

// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。   

func groupAnagrams(strs []string) [][]string {
	result := make([]([]string), 0)
	auxMap := make(map[string]int)

	n := len(strs)

	for i := 0; i < n; i++ {
		sortedStr := sortStr(strs[i])
		if index, ok := auxMap[sortedStr]; ok {
			result[index] = append(result[index], strs[i])
		} else {
			auxMap[sortedStr] = len(result)
			result = append(result, []string{strs[i]})
		}
	}

	return result
}

func sortStr(str string) string {
	n := len(str)
	chars := make([]int, 26)
	for i := 0; i < n; i++ {
		index := str[i] - "a"[0]
		chars[index]++
	}

	result := ""
	for i := 0; i < 26; i++ {
		if chars[i] != 0 {
			result += strings.Repeat(string('a' + i), chars[i])
		}
	}
	return result
}



// 这种超时了
func groupAnagrams1(strs []string) [][]string {
	result := make([]([]string), 0)

	auxMap := make(map[int](map[uint8]int))

	n := len(strs)

	Find:
	for i := 0; i < n; i++ {
		wordMap := make(map[uint8]int)
		for j := 0; j < len(strs[i]); j++ {
			wordMap[strs[i][j]]++
		}

		for index, freqMap := range auxMap {
			if reflect.DeepEqual(wordMap, freqMap) {
				result[index] = append(result[index], strs[i])
				continue Find
			}
		}

		// 走到这说明没有找到异位词
		auxMap[len(result)] = wordMap
		result = append(result, []string{strs[i]})
	}

	return result
}


func main() {
	strs := []string{"eat", "tea", "tan", "ate", "nat", "bat"}
	fmt.Println(groupAnagrams(strs))
}