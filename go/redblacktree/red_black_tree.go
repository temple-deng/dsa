package redblacktree

const (
	RED = true
	BLACK = false
)

type Node struct {
	key string
	value int
	left *Node
	right *Node
	// 具体 true 为红还是黑，自己定
	color bool
}

func NewNode(key string, value int) *Node {
	return &Node{
		key: key,
		value: value,
		color: RED,
	}
}

type RBTree struct {
	root *Node
}