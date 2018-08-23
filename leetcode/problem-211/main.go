// Add and Search Word - Data structure design
package main

import (
	"fmt"
)

// case
// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true

type Node struct {
	isWord bool
	next map[rune]*Node
}

type WordDictionary struct {
  root *Node
}


/** Initialize your data structure here. */
func Constructor() WordDictionary {
  return WordDictionary{&Node{next: make(map[rune]*Node)}}
}


/** Adds a word into the data structure. */
func (this *WordDictionary) AddWord(word string)  {
	cur := this.root
	runes := ([]rune)(word)
	length := len(runes)
	for i := 0; i < length; i++ {
		curRune := runes[i]
		if _, ok := cur.next[curRune]; ok == false {
			cur.next[curRune] = &Node{false, make(map[rune]*Node)}
		}
		cur = cur.next[curRune]
	}
	cur.isWord = true
}


/** Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. */
func (this *WordDictionary) Search(word string) bool {
	return this.search(this.root, ([]rune)(word))
}

func (this *WordDictionary) search(root *Node, word []rune) bool {
	// 递归到单词结尾，说明找到了匹配的单词
	if len(word) == 0 {
		if root.isWord {
			return true
		}
		return false
	}

	cur := root
	curRune := word[0]
	if curRune == '.' {
		has := false
		for _, node := range cur.next {
			// 如果有一个能找到，就能匹配上
			if this.search(node, word[1:]) {
				has = true
			}
		}
		if has {
			return true
		} else {
			return false
		}
	} else {
		if _, ok := cur.next[curRune]; ok != false {
			// 说明存在指向当前字符的指针
			return this.search(cur.next[curRune], word[1:])
		} else {
			// 不存在指向当前字符的指针
			return false
		}
	}
}

func main() {
	obj := Constructor()
	obj.AddWord("at")
	obj.AddWord("and")
	obj.AddWord("an")
	obj.AddWord("add")
	fmt.Println(obj.Search("a"))
	fmt.Println(obj.Search(".at"))
	obj.AddWord("bat")
	fmt.Println(obj.Search(".at"))
	fmt.Println(obj.Search("an."))
	fmt.Println(obj.Search("a.d."))
	fmt.Println(obj.Search("b."))
	fmt.Println(obj.Search("a.d"))
	fmt.Println(obj.Search("."))
	// fmt.Println(obj.Search("pad"))
	// fmt.Println(obj.Search("b..."))
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * obj := Constructor();
 * obj.AddWord(word);
 * param_2 := obj.Search(word);
 */