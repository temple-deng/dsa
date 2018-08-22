// leetcode problem 347
// Top K Frequent Elements
package main

import (
	"fmt"
)

type HeapNode struct {
	Num int
	Fre int
}


func topKFrequent(nums []int, k int) []int {
    freMap := make(map[int]int)
    length := len(nums)
    for i := 0; i < length; i++ {
        freMap[nums[i]]++
		}
		nodes := []HeapNode{}
		for index, value := range freMap {
			nodes = append(nodes,HeapNode{Num: index, Fre: value,})
		}
		heap := &Heap{data: nodes}
		fmt.Println(heap.data)
		length = len(nodes)
		for lastIndex := (length-2)/2; lastIndex >= 0; lastIndex-- {
			heap.SiftDown(lastIndex)
			fmt.Println(heap.data)
		}
		// fmt.Println(heap.data)
		arr := []int{}
		for i:=0; i < k; i++ {
			arr = append(arr, heap.RemoveMax().Num)
		}
		return arr
}

func main() {
	nums := []int{5,-3,9,1,7,7,9,10,2,2,10,10,3,-1,3,7,-9,-1,3,3}
	res := topKFrequent(nums, 3)
	fmt.Println(res)
}

type Heap struct {
	data []HeapNode
}

func (h *Heap) Parent(index int) int {
	return (index - 1) / 2
}

func (h *Heap) LeftChild(index int) int {
	return index * 2 + 1
}

func (h *Heap) RightChild(index int) int {
	return index * 2 + 2
}

func (h *Heap) Add(node HeapNode) {
	h.data = append(h.data, node)
	h.SiftUp()
}

func (h *Heap) SiftUp() {
	curIndex := len(h.data) - 1
	curNode := h.data[curIndex]
	for ; curIndex > 0; {
		parentIndex := h.Parent(curIndex)
		parent := h.data[parentIndex]
		if curNode.Fre > parent.Fre {
			h.swap(curIndex, parentIndex)
			curIndex = parentIndex
		}
		break
	}
}

func (h *Heap) FindMax() HeapNode {
	return h.data[0]
}

func (h *Heap) RemoveMax() HeapNode {
	node := h.FindMax()
	if len(h.data) != 1 {
		lastIndex := len(h.data) - 1
		h.swap(lastIndex, 0)
		h.data = h.data[:len(h.data)-1]
		h.SiftDown(0)
	}

	return node
}

func (h *Heap) swap(index1 int, index2 int) {
	temp := h.data[index1]
	h.data[index1] = h.data[index2]
	h.data[index2] = temp
}

func (h *Heap) SiftDown(index int) {
	curIndex := index
	curNode := h.data[curIndex]
	length := len(h.data)
	for ; h.LeftChild(curIndex) < length; {
		maxIndex := h.LeftChild(curIndex)
		left := h.data[maxIndex]
		if maxIndex + 1 < length && left.Fre < h.data[maxIndex+1].Fre {
			maxIndex++
		}
		if curNode.Fre < h.data[maxIndex].Fre {
			h.swap(curIndex, maxIndex)
			curIndex = maxIndex
		} else {
			break
		}
	}
}