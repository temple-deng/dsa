package bst

import (
	"errors"
	"fmt"
	"../linkedlistqueue"
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

func (t *BST) GetSize() int {
	return t.size
}

func (t *BST) IsEmpty() bool {
	return t.size == 0
}

// 可导出的 Add 方法是向外暴露的添加节点到数里方法
func (t *BST) Add(value int) {
	t.root = t.add(t.root, value)
}

// 非导出的 add 方法用来给树中的子树添加节点
func (t *BST) add(root *Node, value int) *Node {
	if root == nil {
		root = &Node{Value: value,}
		t.size++
		return root
	}

	if value > root.Value {
		root.Right = t.add(root.Right, value)
	} else if value < root.Value {
		root.Left = t.add(root.Left, value)
	}

	return root
}

func (t *BST) Contains(value int) bool {
	return t.contains(t.root, value)
}

func (t *BST) contains(node *Node, value int) bool {
	if node == nil {
		return false
	}

	if node.Value == value {
		return true
	} else if value > node.Value {
		return t.contains(node.Right, value)
	} else {
		return t.contains(node.Left, value)
	}
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
	fmt.Printf("%v  ", node.Value)
	t.preOrder(node.Left)
	t.preOrder(node.Right)
}

func (t *BST) InOrder() {
	t.inOrder(t.root)
}

func (t *BST) inOrder(node *Node) {
	if node == nil {
		return
	}

	t.inOrder(node.Left)
	fmt.Printf("%v  ", node.Value)
	t.inOrder(node.Right)
}

func (t *BST) PostOrder() {
	t.postOrder(t.root)
}

func (t *BST) postOrder(node *Node) {
	if node == nil {
		return
	}

	t.postOrder(node.Left)
	t.postOrder(node.Right)
	fmt.Printf("%v  ", node.Value)
}

func (t *BST) LevelOrder() {
	queue := linkedlistqueue.New()
	
	queue.Enqueue(t.root)
	for ; !queue.IsEmpty(); {
		node, _ := queue.Dequeue()
		fmt.Println(node)

		// 这里由于不支持泛型，只能使用类型断言来实现
		switch node := node.(type) {
		case *Node:
			if node.Left != nil {
				queue.Enqueue(node.Left)
			}
			if node.Right != nil {
				queue.Enqueue(node.Right)
			}
		}

	}
}

func (t *BST) Minimum() (min int, err error) {
	if t.size == 0 {
		err = errors.New("BST is empty")
		return
	}

	min = t.minimum(t.root)
	return
}

func (t *BST) minimum(node *Node) int {
	if node.Left != nil {
		return t.minimum(node.Left)
	} else {
		return node.Value
	}
}

func (t *BST) MinimumNR() (min int, err error) {
	if t.size == 0 {
		err = errors.New("BST is empty")
		return
	}

	cur := t.root
	for {
		if cur.Left != nil {
			cur = cur.Left
		} else {
			min = cur.Value
			return
		}
	}
}

func (t *BST) MaximumNR() (max int, err error) {
	if t.size == 0 {
		err = errors.New("BST is empty")
		return
	}

	cur := t.root
	for {
		if cur.Right != nil {
			cur = cur.Right
		} else {
			max = cur.Value
			return
		}
	}
}

func (t *BST) Maximum() (max int, err error) {
	if t.size == 0 {
		err = errors.New("BST is empty")
		return
	}

	max = t.maximum(t.root)
	return
}

func (t *BST) maximum(node *Node) int {
	if node.Right != nil {
		return t.maximum(node.Right)
	} else {
		return node.Value
	}
}

func (t *BST) RemoveMin() (min int, err error) {
	if t.size == 0 {
		err = errors.New("BST is empty!")
		return
	}

	min, err = t.Minimum()
	t.root = t.removeMin(t.root)
	return
}

func (t *BST) removeMin(node *Node) *Node {
	if node.Left != nil {
		node.Left = t.removeMin(node.Left)
		return node
	} else {
		right := node.Right
		node = nil
		t.size--
		return right
	}
}

func (t *BST) RemoveMax() (max int, err error) {
	if t.size == 0 {
		err = errors.New("BST is empty!")
		return
	}

	max, err = t.Maximum()
	t.root = t.removeMax(t.root)
	return
}

func (t *BST) removeMax(node *Node) *Node {
	if node.Right != nil {
		node.Right = t.removeMax(node.Right)
		return node
	} else {
		left := node.Left
		node = nil
		t.size--
		return left
	}
}

func (t *BST) Remove(value int) {
	t.root = t.remove(value, t.root)
}

func (t *BST) remove(value int, root *Node) *Node {
	if root == nil {
		return root
	} else {
		if value > root.Value {
			root.Left = t.remove(value, root.Left)
			return root
		} else if value < root.Value {
			root.Right = t.remove(value, root.Right)
			return root
		} else {
			if root.Left == nil {
				right := root.Right
				root = right
				t.size--
				return root
			}
			
			if root.Right == nil {
				left := root.Left
				root = left
				t.size--
				return root
			}

			// 首先找到右边子树中的最小值，用这个节点来取代待删除节点
			// 而不是直接把下面的节点上提，这样我们就不用进行树的变换
			// 否则为了维持二叉树的性质，还要进行树的重组
			min := t.minimum(root.Right)
			right := t.removeMin(root.Right)
			node := &Node{Value: min, Right: right, Left: root.Left,}
			root = nil
			return node
		}
		
	}
}

func (t *BST) String() string {
	return "not done"
}