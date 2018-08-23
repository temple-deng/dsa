package unionfind

// 不考虑添加和删除元素
type UnionFind interface {
	IsConnected(int, int) bool
	UnionElements(int, int) error
}