package trie

type Trie struct {
	root *Node
	size int
}

func New() *Trie {
	trie := &Trie{root: NewNode(false), size: 0,}
	return trie
}

func (t *Trie) GetSize() int {
	return t.size
}

func (t *Trie) Add(word string) {
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

func (t *Trie) Contains(word string) bool {
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

func (t *Trie) IsPrefix(prefix string) bool {
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

// func (t *Trie) String() string {
// 	str := "Trie: "
// 	if t.root != nil {
// 		for curRune, node := range t.next {
			
// 		}
// 	}
// }