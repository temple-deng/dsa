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
	// 在 2-3 树中添加一个节点，肯定是要进行融合节点，因此新创建的节点我们都设置为红节点
	// 代表这是一个和其父节点融合的节点
	return &Node{
		key: key,
		value: value,
		color: RED,
	}
}

type RBTree struct {
	root *Node
	size int
}

func (this *RBTree) IsRed(node *Node) bool {
	if node == nil {
		return BLACK
	}
	return node.color
}

func (this *RBTree) Add(key string, value int) {
	this.root = this.add(this.root, key, value)
	this.root.color = BLACK
}


func (this *RBTree) add(root *Node, key string, value int) *Node {
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

	if this.IsRed(root.right) && !this.IsRed(root.left) {
		root = this.leftRotate(root)
	}

	if this.IsRed(root.left) && this.IsRed(root.left.left) {
		root = this.rightRotate(root)
	}

	if this.IsRed(root.left) && this.IsRed(root.right) {
		this.filpColors(root)
	}

	return root
}

// 首先，在一个 2 节点中添加一个节点，必然要进行融合
// 如何新节点融合到左边，那没什么问题，添加为新子节点就好
// 但是如果融合到右边，那要进行一次左旋过程，并且旋转后的左节点要变红
func (this *RBTree) leftRotate(root *Node) *Node {
	x := root.right
	root.right = x.left
	x.left = root
	x.color = root.color
	root.color = RED
	return x
}

// 当对一个 3 节点中添加一个右节点时，要进行颜色反转
func (this *RBTree) filpColors(node *Node) {
	node.color = RED
	node.left.color = BLACK
	node.right.color = RED 
}

// 当对一个 3 节点中添加一个左节点时，要进行右旋转
func (this *RBTree) rightRotate(node *Node) *Node {
	x := node.left
	node.left = x.right
	x.right = node
	x.color = node.color
	node.color = RED
	return x
}