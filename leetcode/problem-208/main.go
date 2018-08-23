// implement Trie data structure
package main

import (
	"fmt"
)

type Node struct {
	isWord bool
	next map[rune]*Node
}

func NewNode(isWord bool) *Node {
	return &Node{isWord: isWord, next: make(map[rune]*Node)}
}

type Trie struct {
  root *Node
	size int
}


/** Initialize your data structure here. */
func Constructor() Trie {
    trie := Trie{root: NewNode(false), size: 0,}
	return trie
}


/** Inserts a word into the trie. */
func (t *Trie) Insert(word string)  {
  cur := t.root
	runes := ([]rune)(word)
	length := len(runes)
	for i := 0; i < length; i++ {
		curRune := runes[i]
		if _, ok := cur.next[curRune]; ok == false {
			cur.next[curRune] = NewNode(false)
		}
		cur = cur.next[curRune]
	}
	if !cur.isWord {
		cur.isWord = true
		t.size++
	}
}


/** Returns if the word is in the trie. */
func (t *Trie) Search(word string) bool {
    cur := t.root
	runes := ([]rune)(word)
	length := len(runes)
	for i := 0; i < length; i++ {
		curRune := runes[i]
		if _, ok := cur.next[curRune]; ok == true {
			cur = cur.next[curRune]
		} else {
			return false
		}
	}
	return cur.isWord
}


/** Returns if there is any word in the trie that starts with the given prefix. */
func (t *Trie) StartsWith(prefix string) bool {
    cur := t.root
	runes := ([]rune)(prefix)
	length := len(runes)
	for i := 0; i < length; i++ {
		curRune := runes[i]
		if _, ok := cur.next[curRune]; ok == true {
			cur = cur.next[curRune]
		} else {
			return false
		}
	}
	return true
}

func main() {
	trie := Constructor()
	trie.Insert("apple")
	fmt.Println(trie.Search("apple"))
}