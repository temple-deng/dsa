/**
 * int 型顺序表的一种简单实现
 * 另一个文件 genericArray.go 实现了泛型的顺序表，不过这里的泛型与其他语言中的泛型不一样
 * 因为 Go 本身不提供泛型的，因此我们只能用 interface{} 来实现泛型
 * 但这样的话，数组中的元素可能是不同类型的
 */
package myArray

import (
	"errors"
	"strconv"
)

// 虽然结构体本身是导出的，但不推荐直接使用字面量生成
// 尽量使用下面的 NewIntArray 函数
type MyArray struct {
	data    []int
	length  int
}

// 返回一个整型动态数组，容量值应大于 0
// 或者也可以用一个数组来进行数组元素的初始化
// 注意这里所谓的数组都是指切片
func NewIntArray(arg ...interface{}) (*MyArray, error) {
	if len(arg) == 0 {
		capacity := 10
		array := MyArray{}
		return &array, array.init(capacity)
	}

	switch v := arg[0].(type) {
	case int:
		capacity := v
		array := MyArray{}
		return &array, array.init(capacity)
	case []int:
		length := len(v)
		data := make([]int, length, cap(v))
		for i := 0; i < length; i++ {
			data[i] = v[i]
		}
		array := MyArray{data: data, length: length,}
		return &array, nil
	default:
		return nil, nil
	}
}

// 初始化
func (a *MyArray) init(capacity int) (err error) {
	if capacity <= 0 {
		return errors.New("Capacity cannot less than or equals 0")
	}
	a.data = make([]int, 0, capacity)
	return
}

// 长度
func (a *MyArray) GetLength() (length int) {
	return a.length
}

// 容量
func (a *MyArray) GetCapacity() (capacity int) {
	return cap(a.data)
}

// 是否为空
func (a *MyArray) IsEmpty() bool {
	return a.length == 0
}

// 尾端插入
func (a *MyArray) AddLast(elem int) (err error) {
	return a.Insert(a.length, elem)
}

func (a *MyArray) AddFirst(elem int) (err error) {
	return a.Insert(0, elem);
}

// 插入
// 复杂度是 O(n/2) = O(n)
func (a *MyArray) Insert(index int, elem int) error {
	// index 位置不合法
	if index < 0 || index > a.length {
		return errors.New("Index out of range")
	}

	if a.length == a.GetCapacity() {
		a.resize(a.GetCapacity() * 2)
	}

	a.data = append(a.data, 0)
	for i := a.length; i > index; i-- {
		a.data[i] = a.data[i-1]
	}
	a.data[index] = elem
	a.length++
	return nil
}

func (a *MyArray) Get(index int) (elem int, err error) {
	if index < 0 || index >= a.length {
		err = errors.New("Index out of the range")
		return
	}

	elem = a.data[index]
	return
}

func (a *MyArray) Set(index int, elem int) (err error) {
	if index < 0 || index >= a.length {
		err = errors.New("Index out of the range")
		return
	}

	a.data[index] = elem
	return
}

func (a *MyArray) Contains(elem int) bool {
	for i := 0; i < a.length; i++ {
		if a.data[i] == elem {
			return true
		}
	}
	return false
}

func (a *MyArray) Find(elem int) int {
		for i := 0; i < a.length; i++ {
		if a.data[i] == elem {
			return i
		}
	}
	return -1
}

// 复杂度是 O(n/2) = O(n)
func (a *MyArray) Remove(index int) (elem int, err error) {
	if index < 0 || index >= a.length {
		err = errors.New("Index out of the range")
	}

	if a.length == a.GetCapacity() / 4 && a.GetCapacity()/2 != 0 {
		a.resize(a.GetCapacity()/2)
	}

	elem = a.data[index]
	for i := index; i < a.length - 1; i++ {
		a.data[i] = a.data[i+1]
	}
	a.length--
	return
}

func (a *MyArray) RemoveLast() (int, error) {
	return a.Remove(a.length - 1)
}

func (a *MyArray) RemoveFirst() (int, error) {
	return a.Remove(0)
}

// String 方法的接收者是结构体而不是指针
// 因为如果最终定义为指针的接收者，那么是指针实现了 Stringer 接口
// 而不是结构体
func (a *MyArray) String() string {
	str := "[ "
	for i := 0; i < a.length - 1; i++ {
		str += strconv.Itoa(a.data[i]) + ", "
	}

	if a.length != 0 {
		str += strconv.Itoa(a.data[a.length-1])
	}
	str += " ]"

	return str
}

func (a *MyArray) resize(newCapacity int) {
	newData := make([]int, a.length, newCapacity)
	for i := 0; i < a.length; i++ {
		newData[i] = a.data[i]
	}

	a.data = newData
}
