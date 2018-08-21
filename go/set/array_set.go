package set

import (
	"../myArray"
	"errors"
)

// 以数组为底层的集合的实现
// 但是很遗憾这个实现其实并没有实现 Set 接口
// 主要是在并交差、子集相等方面，一个 Set 接口并没有暴露出遍历元素的方法
// 那我们就没办法实现这些操作，因为我们总归是要遍历第二个集合的
type ArraySet struct {
	data *myArray.Array
}

func NewArraySet(capacities ...int) (*ArraySet, error) {
	capacity := capacities[0]
	data, err := myArray.NewArray(capacity)
	return &ArraySet{data: data,}, err
}

func (s *ArraySet) GetSize() int {
	return s.data.GetLength()
}

func (s *ArraySet) IsEmpty() bool {
	return s.data.IsEmpty()
}

func (s *ArraySet) Contains(value interface{}) bool {
	return s.data.Contains(value)
}

func (s *ArraySet) Insert(value interface{}) bool {
	// 这里是一个 O(n) 复杂度的操作，所以综合来看 Insert 也是一个 O(n) 复杂度的操作
	if s.Contains(value) {
		return false
	}

	s.data.AddLast(value)
	return true
}

func (s *ArraySet) Remove() (value interface{}, err error) {
	index := s.data.Find(value)
	if index == -1 {
		err = errors.New("Value is not in set")
		return
	}

	value, _ = s.data.Remove(index)
	return
}

// 里面下面的集合操作，都应该使用 Set 接口类型
// 但是介于是初次尝试，我们先使用 ArraySet 熟悉一下
// 两次循环复杂分别是 O(n) 和 O(nm)
// 则总体复杂度就是 O(n) + O(mn) = O(mn)
// 并集，首先把第一个集合的元素全部装入新集合
// 然后遍历第二个集合，把不在第一个集合中的成员插入新集合
func (s *ArraySet) Union(set *ArraySet) *ArraySet {
	cap1 := s.data.GetCapacity()
	cap2 := s.data.GetCapacity()
	newSet, _ := NewArraySet(cap1 + cap2)
	
	// 注意这里使用内部方法 insertWithoutCheck
	// 这样这个循环的复杂度就是 n * 2O(1) = O(n)
	// 用 Insert 的话就变成了 O(n^2)
	// 同理下面也是
	for i := 0; i < s.GetSize(); i++ {
		value, _ := s.data.Get(i)
		newSet.insertWithoutCheck(value)
	}

	// m 次循环，每次 O(1) + O(n) + O(1)，则 O(mn)
	for i := 0; i < set.GetSize(); i++ {
		value, _ := set.data.Get(i)
		contain := s.Contains(value)
		if !contain {
			newSet.insertWithoutCheck(value)
		}
	}

	return newSet
}

// 不检查成员是否存在，直接插入，这样就可以把插入操作的时间复杂度
// 降低到 O(1) - 均摊复杂度
func (s *ArraySet) insertWithoutCheck(value interface{}) {
	s.data.AddLast(value)
}

// 交集，遍历第一个集合，如果一个成员在第二个集合中也存在，则插入
func (s *ArraySet) Intersection(set *ArraySet) *ArraySet {
	size1 := s.GetSize()
	size2 := set.GetSize()
	newSet, _ := NewArraySet(size1 + size2)

	// n * m = O(mn)
	for i := 0; i < size1; i++ {
		value, _ := s.data.Get(i)
		if set.Contains(value) {
			newSet.insertWithoutCheck(value)
		}
	}

	return newSet
}

// 差集，在第一个集合而不再第二个集合中的元素
func (s *ArraySet) Difference(set *ArraySet) *ArraySet {
	size1 := s.GetSize()
	size2 := set.GetSize()
	var cap int
	if size1 > size2 {
		cap = size1
	} else {
		cap = size2
	}
	newSet, _ := NewArraySet(cap)

	for i := 0; i < size1; i++ {
		value, _ := s.data.Get(i)
		if !set.Contains(value) {
			newSet.insertWithoutCheck(value)
		}
	}

	return newSet
}

// 集合是否是另一个集合的子集
// 其实从步骤上就可以看出，我们可以换一种思路
// 如果求差集的结果是一个空集，也可以表示为子集
func (s *ArraySet) IsSubset(set *ArraySet) bool {
	size1 := s.GetSize()
	size2 := set.GetSize()

	if size1 > size2 {
		return false
	}

	for i := 0; i < size1; i++ {
		value, _ := s.data.Get(i)
		if !set.Contains(value) {
			return false
		}
	}

	return true
}

// 这个相等的操作和子集操作差不多啊，只要成员个数相等，两者又是子集关系
// 那肯定就相等了
func (s *ArraySet) IsEqual(set *ArraySet) bool {
	size1 := s.GetSize()
	size2 := set.GetSize()

	if size1 != size2 {
		return false
	}

	return s.IsSubset(set)
}