package main

// case
// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true

type Node struct {
	hasPrefix bool
	hasSuffix bool
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
			node := Node{
				hasPrefix: i != 0,
				hasSuffix: true,
				next: make(map[rune]*Node),
			}
			cur.next[curRune] = &node
		}
		cur = cur.next[curRune]
	}
	cur.hasSuffix = false
}


/** Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. */
func (this *WordDictionary) Search(word string) bool {
	cur := this.root
	runes := ([]rune)(word)
	length := len(runes)
	for i := 0; i < length; i++ {
		curRune := runes[i]
		node, ok := cur.next[curRune]
		if curRune == '.' {
			
		}
	}
}


/**
 * Your WordDictionary object will be instantiated and called as such:
 * obj := Constructor();
 * obj.AddWord(word);
 * param_2 := obj.Search(word);
 */