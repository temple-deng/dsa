package bst

import (
	"errors"
	"fmt"
	"../queue"
)

// 在我们的实现中，二叉搜索树是不包含重复元素的
// 没想到，用了递归，竟如此简单
type BST struct {
	root *Node
	size int
}

func New() *BST {
	return &BST{root: nil, size: 0,}
}

func (this *BST) GetSize() int {
	return this.size
}

func (this *BST) IsEmpty() bool {
	return this.size == 0
}

func (this *BST) Add(value int) {
	this.root = this.add(this.root, value)
}

func (this *BST) add(root *Node, value int) *Node {
	if root == nil {
		node := &Node{value: value,}
		this.size++
		return node
	}

	if value < root.value {
		root.left = this.add(root.left, value)
	}

	if value > root.value {
		root.right = this.add(root.right, value)
	}

	return root
}

func (this *BST) Contains(value int) bool {
	return this.contains(this.root, value)
}

func (this *BST) contains(root *Node, value int) bool {
	if root == nil {
		return false
	}

	if root.value == value {
		return true
	}

	if value < root.value {
		return this.contains(root.left, value)
	}

	return this.contains(root.right, value)
}

func (t *BST) PreOrder() {
	t.preOrder(t.root)
}

func (t *BST) preOrder(node *Node) {
	if node == nil {
		return
	}

	// 我们这里简化一下，遍历操作只打印一下节点值
	// 理论上来说，遍历方法应该接收一个函数作为参数
	// 让这个函数去具体执行遍历时要对节点进行的操作
	// 但是在 Go 中好像没有函数指针，那我们无法确定函数的签名是怎样的
	fmt.Printf("%v  ", node.value)
	t.preOrder(node.left)
	t.preOrder(node.right)
}

func (t *BST) InOrder() {
	t.inOrder(t.root)
}

func (t *BST) inOrder(node *Node) {
	if node == nil {
		return
	}

	t.inOrder(node.left)
	fmt.Printf("%v  ", node.value)
	t.inOrder(node.right)
}

func (t *BST) PostOrder() {
	t.postOrder(t.root)
}

func (t *BST) postOrder(node *Node) {
	if node == nil {
		return
	}

	t.postOrder(node.left)
	t.postOrder(node.right)
	fmt.Printf("%v  ", node.value)
}

func (t *BST) LevelOrder() {
	queue := queue.New()
	
	queue.Enqueue(t.root)
	for ; !queue.IsEmpty(); {
		node, _ := queue.Dequeue()
		fmt.Println(node)

		// 这里由于不支持泛型，只能使用类型断言来实现
		switch node := node.(type) {
		case *Node:
			if node.left != nil {
				queue.Enqueue(node.left)
			}
			if node.right != nil {
				queue.Enqueue(node.right)
			}
		}

	}
}

// 返回树中的最大值，需要注意与下面内部方法返回值的区别
// 这个方法会返回的最大值节点中的值，而下面的是返回最大值的那个节点
func (this *BST) Maximum() (int, error) {
	if this.root == nil {
		return 0, errors.New("BST is Empty")
	}

	maxNode := this.maximum(this.root)
	return maxNode.value, nil
}

// 返回最大值所在节点
func (this *BST) maximum(root *Node) *Node {
	if root.right != nil {
		return this.maximum(root.right)
	}

	return root
}

// 返回树中的最小值，需要注意与下面内部方法返回值的区别
// 这个方法会返回的最小值节点中的值，而下面的是返回最小值的那个节点
func (this *BST) Minimum() (int, error) {
	if this.root == nil {
		return 0, errors.New("BST is Empty")
	}

	minNode := this.minimum(this.root)
	return minNode.value, nil
}

// 返回最小值所在节点
func (this *BST) minimum(root *Node) *Node {
	if root.left != nil {
		return this.minimum(root.left)
	}

	return root
}

func (this *BST) RemoveMax() (int, error) {
	if this.root == nil {
		return 0, errors.New("BST is empty")
	}

	value, _ := this.Maximum()
	this.root = this.removeMax(this.root)
	return value, nil
}

func (this *BST) removeMax(root *Node) *Node {
	if root.right != nil {
		root.right = this.removeMax(root.right)
		return root
	}

	this.size--
	return root.left
}

func (this *BST) RemoveMin() (int, error) {
	if this.root == nil {
		return 0, errors.New("BST is empty")
	}

	value, _ := this.Minimum()
	this.root = this.removeMin(this.root)
	return value, nil
}

func (this *BST) removeMin(root *Node) *Node {
	if root.left != nil {
		root.left = this.removeMin(root.left)
		return root
	}

	this.size--
	return root.right
}

func (this *BST) Remove(value int) error {
	if this.Contains(value) == false {
		return errors.New("Value wasn't in BST")
	}

	this.root = this.remove(this.root, value)
	return nil
}

func (this *BST) remove(root *Node, value int) *Node {
	// 个人感觉这个条件是取不到的，因为我们在 remove 前已经判定了节点一定要树中
	// 所以可能不会递归到空节点还没找到
	if root == nil {
		return nil
	}

	if value < root.value {
		root.left = this.remove(root.left, value)
		return root
	}

	if value > root.value {
		root.right = this.remove(root.right, value)
		return root
	}

	if root.left == nil {
		right := root.right
		root.right = nil
		this.size--
		return right
	}

	if root.right == nil {
		left := root.left
		root.left = nil
		this.size--
		return left
	}

	successor := this.minimum(root.right)
	successor.left = root.left
	successor.right = root.right
	this.removeMin(root.right)
	root.left = nil
	root.right = nil
	this.size--
	return successor
}

func (t *BST) String() string {
	return "not done"
}