// 实现一个 MapSum 类里的两个方法，insert 和 sum。

// 对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。

// 对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。
package main

import (
	"fmt"
)

type Node struct {
	value int
	next map[rune]*Node
}

type MapSum struct {
  root *Node
}


/** Initialize your data structure here. */
func Constructor() MapSum {
  return MapSum{&Node{value: 0, next: make(map[rune]*Node),}}
}


func (this *MapSum) Insert(key string, val int)  {
	cur := this.root
	runes := ([]rune)(key)
	length := len(runes)
	
	for i := 0; i < length; i++ {
		curRune := runes[i]
		if _, ok := cur.next[curRune]; !ok {
			node := &Node{value: 0, next: make(map[rune]*Node),}
			cur.next[curRune] = node
		}
		cur = cur.next[curRune]
	}
	cur.value = val
}


func (this *MapSum) Sum(prefix string) int {
	chars := ([]rune)(prefix)
	length := len(chars)
	cur := this.root
	for i := 0; i < length && cur != nil; i++ {
		if cur == nil {
			return 0
		}
		cur = cur.next[chars[i]]
	}
	if cur == nil {
		return 0
	}
	return this.sum(cur)
}

func (this *MapSum) sum(root *Node) int {
	if root.next == nil {
		return root.value
	}

	sum := root.value
	for _, node := range root.next {
		sum += this.sum(node)
	}
	return sum
}


/**
 * Your MapSum object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Insert(key,val);
 * param_2 := obj.Sum(prefix);
 */

func main() {
	obj := Constructor()
	obj.Insert("a", 3)
	fmt.Println(obj.Sum("ap"))
	obj.Insert("b", 2)
	fmt.Println(obj.Sum("a"))
}