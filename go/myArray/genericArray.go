// 泛型顺序表的实现，可以装入任意的元素类型
// 理论上好像没有什么问题
// 这个包虽然把 MyArray 和 Array 都声明成可导出的，但是推荐使用 NewArray 的方法获取结构
// 因为 init 方法并没有导出，所以不适用 New 方法形式，内部数组应该是无法初始化长度的
// 会报错
package myArray

import (
	"errors"
	"fmt"
)

type Array struct {
	data []interface{}
	length int
}

func NewArray(capacities ...int) (*Array, error) {
	arr := Array{}
	capacity := capacities[0]
	return &arr, arr.init(capacity)
}

// 初始化
func (a *Array) init(capacity int) (err error) {
	if capacity <= 0 {
		return errors.New("Capacity cannot less than 0")
	}
	a.data = make([]interface{}, a.length, capacity)
	return
}

// 长度
func (a *Array) GetLength() (length int) {
	return a.length
}

// 容量
func (a *Array) GetCapacity() (capacity int) {
	return cap(a.data)
}

// 是否为空
func (a *Array) IsEmpty() bool {
	return a.length == 0
}

// 尾端插入
func (a *Array) AddLast(elem interface{}) {
	a.Insert(a.length, elem)
}

func (a *Array) AddFirst(elem interface{}) {
	a.Insert(0, elem)
}

// 插入
func (a *Array) Insert(index int, elem interface{}) (err error) {
	// index 位置不合法
	if index < 0 || index > a.length {
		return errors.New("index out of range")
	}


	if a.length == a.GetCapacity() {
		a.resize(a.GetCapacity() * 2)
	}

	a.data = append(a.data, nil)
	for i := a.length; i > index; i-- {
		a.data[i] = a.data[i-1]
	}
	a.data[index] = elem
	a.length++
	return
}

func (a *Array) Get(index int) (elem interface{}, err error) {
	if index < 0 || index >= a.length {
		err = errors.New("Index out of the range")
		return
	}

	elem = a.data[index]
	return
}

func (a *Array) Set(index int, elem interface{}) (err error) {
	if index < 0 || index >= a.length {
		err = errors.New("Index out of the range")
		return
	}

	a.data[index] = elem
	return
}

func (a *Array) Contains(elem interface{}) bool {
	for i := 0; i < a.length; i++ {
		if a.data[i] == elem {
			return true
		}
	}
	return false
}

func (a *Array) Find(elem interface{}) int {
		for i := 0; i < a.length; i++ {
		if a.data[i] == elem {
			return i
		}
	}
	return -1
}

func (a *Array) Remove(index int) (elem interface{}, err error) {
	if index < 0 || index >= a.length {
		err = errors.New("Index out of the range")
	}

	if a.length == a.GetCapacity() / 4 && a.GetCapacity() / 2 != 0 {
		a.resize(a.GetCapacity()/2)
	}

	elem = a.data[index]
	for i := index; i < a.length - 1; i++ {
		a.data[i] = a.data[i+1]
	}
	a.length--
	return
}

func (a *Array) RemoveLast() (interface{}, error) {
	return a.Remove(a.length-1)
}

func (a *Array) RemoveFirst() (interface{}, error) {
	return a.Remove(0)
}

func (a *Array) String() string {
	str := "["
	for i := 0; i < a.length - 1; i++ {
		str += fmt.Sprint(a.data[i]) + ", "
	}

	if a.length != 0 {
		str += fmt.Sprint(a.data[a.length-1])
	}
	str += "]"
	return str
}

func (a *Array) resize(newCapacity int) {
	var newData = make([]interface{}, a.length, newCapacity)

	for i := 0; i < a.length; i++ {
		newData[i] = a.data[i]
	}
	a.data = newData
}