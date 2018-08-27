// 基于 BST 为底层实现的 Map 结构
// 暴露的结构方法如下:
// GetSize() int
// IsEmpty() bool
// Contains(string) bool
// Get(string) int, bool
// Set(string, int) error
// Add(string, int)
// Remove(string) int, bool
// 这里的 Remove 的操作失败的结果以 error 类型返回会不会更好
package selfmap

import (
	"errors"
	"fmt"
)

type BSTNode struct {
	key string
	value int
	left *BSTNode
	right *BSTNode
}

func (n *BSTNode) String() string {
	return fmt.Sprintf("{%s: %d}", n.key, n.value)
}

type BSTMap struct {
	root *BSTNode
	size int
}

func NewBSTMap() *BSTMap {
	return &BSTMap{}
}

func (m *BSTMap) GetSize() int {
	return m.size
}

func (m *BSTMap) IsEmpty() bool {
	return m.size == 0
}

func (m *BSTMap) getNode(key string) *BSTNode {
	return m.getNodeInSubtree(m.root, key)
}

func (m *BSTMap) getNodeInSubtree(root *BSTNode, key string) *BSTNode {
	if root == nil {
		return nil
	}

	if key < root.key {
		return m.getNodeInSubtree(root.left, key)
	} else if key > root.key {
		return m.getNodeInSubtree(root.right, key)
	} else {
		return root
	}
}

func (m *BSTMap) Contains(key string) bool {
	return m.getNode(key) != nil
}

func (m *BSTMap) Add(key string, value int) {
	node := m.getNode(key)
	if node != nil {
		node.value = value
		return
	}

	m.root = m.add(m.root, key, value)
}

func (m *BSTMap) add(root *BSTNode, key string, value int) *BSTNode {
	if root == nil {
		newNode := &BSTNode{key: key, value: value,}
		m.size++
		return newNode
	}

	if key < root.key {
		root.left = m.add(root.left, key, value)
	} else {
		root.right = m.add(root.right, key, value)
	}
	return root
}

func (m *BSTMap) Get(key string) (int, bool) {
	node := m.getNode(key)
	if node == nil {
		return 0, false
	}

	return node.value, true
}

func (m *BSTMap) Set(key string, value int) error {
	node := m.getNode(key)
	if node == nil {
		return errors.New("Key doesn't exist")
	}
	node.value = value
	return nil
}

func (m *BSTMap) Remove(key string) (value int, ok bool) {
	node := m.getNode(key)
	if node == nil {
		return 0, false
	}
	value = node.value
	ok = true
	m.root = m.remove(m.root, key)
	return
}

func (m *BSTMap) remove(root *BSTNode, key string) *BSTNode {
	// 虽然这里给出 nil 的判断，但是我始终觉得是取不到这个条件的
	// 因为首先我们是判断了树中肯定有这个节点，才开始 remove 操作的
	// 那就不应该会递归到 nil 的情况
	if root == nil {
		return nil
	}

	if key < root.key {
		root.left = m.remove(root.left, key)
		return root
	} else if key > root.key {
		root.right = m.remove(root.right, key)
		return root
	} else {
		if root.left == nil {
			right := root.right
			root = nil
			m.size--
			return right
		}

		if root.right == nil {
			left := root.left
			root = nil
			m.size--
			return left
		}

		successor := m.minimum(root.right)
		successor.right = m.removeMin(root.right)
		successor.left = root.left
		root = nil
		return successor
	}
}

func (m *BSTMap) minimum(root *BSTNode) *BSTNode {
	if root.left == nil {
		return root
	}
	return m.minimum(root.left)
}

func (m *BSTMap) removeMin(root *BSTNode) *BSTNode {
	if root.left == nil {
		right := root.right
		// 这里还是不要直接把 root 设为 nil 的好
		// 防止之后的操作万一又访问到
		// 这里也是给以后一个提醒，在确保之后的操作不会访问节点前，不要随便删除节点
		root.right = nil
		m.size--
		return right
	}
	root.left = m.removeMin(root.left)
	return root
}