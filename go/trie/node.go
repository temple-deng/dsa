package trie

type Node struct {
	isWord bool
	next map[rune]*Node
}

func NewNode(isWord bool) *Node {
	return &Node{isWord: isWord, next: make(map[rune]*Node)}
}