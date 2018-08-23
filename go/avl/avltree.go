package avltree

import (
	"math"
)

type Node struct {
	key string
	value int
	left *Node
	right *Node
	height int
}

func NewNode(key string, value int) *Node {
	return &Node{key: key, value: value, height: 1,}
}

type AVLTree struct {
	root *Node
	size int
}

func New() *AVLTree {
	return &AVLTree{}
}

func (this *AVLTree) GetSize() int {
	return this.size
}

func (this *AVLTree) IsEmpty() bool {
	return this.size == 0
}

func (this *AVLTree) getHeight(node *Node) int {
	if node == nil {
		return 0
	}
	return node.height
}

func (this *AVLTree) getBalanceFactor(node *Node) int {
	if node == nil {
		return 0
	}
	return this.getHeight(node.left) - this.getHeight(node.right)
}

func (this *AVLTree) Add(key string, value int) {
	this.root = this.add(this.root, key, value)
}

func (this *AVLTree) add(root *Node, key string, value int) *Node {
	if root == nil {
		node := NewNode(key, value)
		this.size++
		return node
	}

	if key < root.key {
		root.left = this.add(root.left, key, value)
	} else if key > root.key {
		root.right = this.add(root.right, key, value) 
	} else {
		root.value = value
	}

	root.height = int(math.Max(float64(this.getHeight(root.left)), float64(this.getHeight(root.right)))) + 1
	return root
}

func (this *AVLTree) IsBST() bool {
	keys := []string{}
	this.inOrder(this.root, keys)

	length := len(keys)
	for i := 1; i < length; i++ {
		if keys[i-1] > keys[i] {
			return false
		}
	}
	return true
}

func (this *AVLTree) inOrder(node *Node, keys []string) {
	if node == nil {
		return
	}

	this.inOrder(node.left, keys)
	keys = append(keys, node.key)
	this.inOrder(node.right, keys)
}

func (this *AVLTree) IsBalanced() bool {
	return this.isBalanced(this.root)
}

func (this *AVLTree) isBalanced(node *Node) bool {
	if node == nil {
		return true
	}

	if math.Abs(float64(this.getBalanceFactor(node))) > 1 {
		return false
	}

	return this.isBalanced(node.left) && this.isBalanced(node.right)
}