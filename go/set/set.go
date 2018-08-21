package set

type Set interface {
	Insert(interface{}) bool
	Remove(interface{}) (interface{}, error)
	Union(*Set) *Set
	Intersection(*Set) *Set
	Difference(*Set) *Set
	Contains(interface{}) bool
	IsSubset(*Set) bool
	IsEqual(*Set) bool
	GetSize() int
	IsEmpty() bool
}