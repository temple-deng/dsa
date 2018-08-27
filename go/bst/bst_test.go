package bst

import (
	"fmt"
	"testing"
)

func TestBST(t *testing.T) {
	bst := New()

	size := bst.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	bst.Add(5)
	bst.Add(2)
	bst.Add(7)
	bst.Add(-3)
	bst.Add(100)
	bst.Add(4)
	bst.Add(29)

	contain0 := bst.Contains(0)
	if contain0 {
		t.Error("Wrong, expected no contain 0, but got contain")
	}

	// 应是一个这样的树
	//             5
	//           /   \
	//          2     7
	//        /  \     \
	//       -3  4     100
	//                 /
	//                29
	// 
	// 前序 5 2 -3 4 7 100 29
	// 中序 -3 2 4 5 7 29 100
	// 后序 -3 4 2 29 100 7 5
	// 层序 
	// 遍历测试
	bst.PreOrder()
	fmt.Println()
	bst.InOrder()
	fmt.Println()
	bst.PostOrder()
	fmt.Println()
	// bst.LevelOrder()
	// fmt.Println()

	// max test
	max, err := bst.Maximum()
	if err != nil {
		t.Error(err)
	}

	if max != 100 {
		t.Errorf("Wrong max value, expected 100, but got %d", max)
	}

	// min test
	min, err := bst.Minimum()
	if err != nil {
		t.Error(err)
	}

	if min != -3 {
		t.Errorf("Wrong min value, expected -3, but got %d", min)
	}

	// remove test
	bst.Remove(7)
	size = bst.GetSize()
	if size != 6 {
		t.Errorf("Wrong size, expected 6, but got %d", size)
	}

	// remove max 100
	max, err = bst.RemoveMax()
	if err != nil {
		t.Error(err)
	}

	if max != 100 {
		t.Errorf("Wrong max value, expected 100, but got %d", max)
	}

	// remove max 29
	max, err = bst.RemoveMax()
	if err != nil {
		t.Error(err)
	}

	if max != 29 {
		t.Errorf("Wrong max value, expected 29, but got %d", max)
	}

	// max test again
	max, err = bst.RemoveMax()
	if err != nil {
		t.Error(err)
	}

	if max != 5 {
		t.Errorf("Wrong max value, expected 5, but got %d", max)
	}

	bst.Add(99)
	// max test again
	max, err = bst.RemoveMax()
	if err != nil {
		t.Error(err)
	}

	if max != 99 {
		t.Errorf("Wrong max value, expected 99, but got %d", max)
	}
}