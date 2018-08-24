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

// 获取节点的高度值
func (this *AVLTree) getHeight(node *Node) int {
	if node == nil {
		return 0
	}
	return node.height
}

// 获取节点的平衡因子
func (this *AVLTree) getBalanceFactor(node *Node) int {
	if node == nil {
		return 0
	}
	return this.getHeight(node.left) - this.getHeight(node.right)
}

// 判断当前树是否满足 BST 树
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

// 中序遍历
func (this *AVLTree) inOrder(node *Node, keys []string) {
	if node == nil {
		return
	}

	this.inOrder(node.left, keys)
	keys = append(keys, node.key)
	this.inOrder(node.right, keys)
}

// 判断树是否平衡
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

// 向 AVL 树中添加节点或更新节点
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

	// 更新高度值
	root.height = int(math.Max(float64(this.getHeight(root.left)), float64(this.getHeight(root.right)))) + 1

	// 计算平衡因子
	balancedFactor := this.getBalanceFactor(root)

	// 平衡维护
	// 平衡因子大于 1，说明是往左子树中插入节点导致树不平衡
	// 同时由于左子树的平衡因子大于 0，说明是往左侧的左侧插入节点导致的不平衡
	// LL
	if balancedFactor > 1 && this.getBalanceFactor(root.left) >= 0 {
		return this.rightRotate(root)
	}

	// 平衡因子小于 -1，说明是往右子树中插入节点导致树不平衡
	// 同时由于右子树的平衡因子小于 0，说明是往右侧的右侧插入节点导致的不平衡
	// RR
	if balancedFactor < -1 && this.getBalanceFactor(root.right) <= 0 {
		return this.leftRotate(root)
	}

	// LR
	// 因子大于 1，但左子树平衡因子小于 0
	// 说明是在左侧的右侧插入节点导致不平衡
	// 平衡过程就是先对不平衡节点的左子树进行左旋转
	// 这时就转换成了 LL 的情况，因此再对节点进行右旋转
	if balancedFactor > 1 && this.getBalanceFactor(root.left) < 0 {
		root.left = this.leftRotate(root.left)
		return this.rightRotate(root)
	}

	// RL
	// 因子小于 -1，但右子树平衡因子大于 0
	// 说明是在右侧的左侧插入节点导致不平衡
	// 平衡过程就是先对不平衡节点的右子树进行右旋转
	// 这时就转换成了 RR 的情况，因此再对节点进行左旋转
	if balancedFactor < -1 && this.getBalanceFactor(root.right) > 0 {
		root.right = this.rightRotate(root.right)
		return this.leftRotate(root)
	}
	return root
}

// 对以 root 为根的树进行右旋转，返回旋转后的新根
//            root										x
//					 /    \                 /   \
//					x      t4   ==>        z     root
//				/   \									  / \    /\
//			 z     t3								t1  t2  t3 t4
//		 /   \
//		t1   t2
func (this *AVLTree) rightRotate(root *Node) *Node {
	x := root.left
	newLeft := x.right
	x.right = root
	root.left = newLeft

	// 更新 height，怎么会如此简单
	root.height = int(math.Max(float64(this.getHeight(root.left)), float64(this.getHeight(root.right)))) + 1
	x.height = int(math.Max(float64(this.getHeight(x.left)), float64(this.getHeight(x.right)))) + 1

	return x
}

// 左旋转
//			root                           x
//		 /    \                        /   \
//    t4     x          ===>       root   z
//         /   \                 /    \   / \
//				t3    z               t4    t3  t1 t2
//            /   \
//					 t1    t2
func (this *AVLTree) leftRotate(root *Node) *Node {
	x := root.right
	newRight := x.left
	root.right = newRight
	x.left = root

	root.height = int(math.Max(float64(this.getHeight(root.left)), float64(this.getHeight(root.right)))) + 1
	x.height = int(math.Max(float64(this.getHeight(x.left)), float64(this.getHeight(x.right)))) + 1

	return x
}

func (this *AVLTree) getNode(root *Node, key string) *Node {
	if root == nil {
		return nil
	}

	if root.key == key {
		return root
	}

	if key < root.key {
		return this.getNode(root.left, key)
	}

	return this.getNode(root.right, key)
}

// 移除失败，究竟是通过 bool 值通知好，还是通过 error 值通知好
func (this *AVLTree) Remove(key string) (value int, ok bool) {
	node := this.getNode(this.root, key)
	if node == nil {
		ok = false
		return
	}

	value = node.value
	ok = true
	this.root = this.remove(this.root, key)
	return
}

func (this *AVLTree) remove(root *Node, key string) *Node {
	// 其实个人感觉是不会出现 nil 的情况的，但为了保险，还是加上了
	// 因为在 remove 操作前，我们一定是确定节点在树中，在进行 remove 的
	if root == nil {
		return nil
	}

	var retNode *Node
	if key < root.key {
		root.left = this.remove(root.left, key)
		retNode = root
	} else if key > root.key {
		root.right = this.remove(root.right, key)
		retNode = root
	} else {

		if root.left == nil {
			right := root.right
			root.right = nil
			this.size--
			retNode = right
		}
	
		if root.right == nil {
			left := root.left
			root.left = nil
			this.size--
			retNode = left
		}
	
		successor := this.minimum(root.right)
		successor.left = root.left
		// 这里避免用 removeMin，因为这个操作也是可能打破平衡性的
		successor.right = this.remove(root.right, successor.key)

		// 这里采用不那么激进的 root = nil 赋值
		// 避免出现意外的问题
		root.left = nil
		root.right = nil
		retNode = successor
	}

	// Note
	if retNode == nil {
		return nil
	}

	// 更新高度值
	retNode.height = int(math.Max(float64(this.getHeight(retNode.left)), float64(this.getHeight(retNode.right)))) + 1

	// 计算平衡因子
	balancedFactor := this.getBalanceFactor(retNode)

	if balancedFactor > 1 && this.getBalanceFactor(retNode.left) >= 0 {
		return this.rightRotate(retNode)
	}

	if balancedFactor < -1 && this.getBalanceFactor(retNode.right) <= 0 {
		return this.leftRotate(retNode)
	}

	if balancedFactor > 1 && this.getBalanceFactor(retNode.left) < 0 {
		retNode.left = this.leftRotate(retNode.left)
		return this.rightRotate(retNode)
	}

	if balancedFactor < -1 && this.getBalanceFactor(retNode.right) > 0 {
		retNode.right = this.rightRotate(retNode.right)
		return this.leftRotate(retNode)
	}

	return retNode
}

func (this *AVLTree) minimum(root *Node) *Node {
	cur := root
	for ; cur.left != nil; cur = cur.left {}
	return cur
}

// func (this *AVLTree) removeMin(root *Node) *Node {
// 	if root.left == nil {
// 		right := root.right
// 		root.right = nil 
// 		this.size--
// 		return right
// 	}

// 	root.left = this.removeMin(root.left)
// 	return root
// }