package segmenttree

type Merger interface {
	Merge(a int, b int) int
}