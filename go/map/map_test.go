package selfmap

import (
	"testing"
)

func TestBSTMap(t *testing.T) {
	bstMap := NewBSTMap()

	size := bstMap.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	bstMap.Add("Hello", 1)
	bstMap.Add("World", 2)

	he, ok := bstMap.Get("Hello")
	if ok != true {
		t.Error("Wrong get")
	}

	if he != 1 {
		t.Errorf("Wrong value, expected 1, but got %d", he)
	}

	bstMap.Set("World", 100)
	wo, ok := bstMap.Get("World")
	if ok != true {
		t.Error("Wrong get")
	}

	if wo != 100 {
		t.Errorf("Wrong value, expected 100, but got %d", wo)
	}

	containGo := bstMap.Contains("Go")
	if containGo == true {
		t.Error("Wrong contain")
	}

	bstMap.Remove("Hello")
	bstMap.Remove("World")
	empty := bstMap.IsEmpty()
	if empty != true {
		t.Error("Wrong empty")
	}

	_, ok = bstMap.Get("Hello")
	if ok == true {
		t.Error("Wrong get, expected not contain Hello, but gou contain")
	}
}

func TestLinkedListMap(t *testing.T) {
	llMap := New()

	size := llMap.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	llMap.Add("Hello", 1)
	llMap.Add("World", 2)

	he, ok := llMap.Get("Hello")
	if ok != true {
		t.Error("Wrong get")
	}

	if he != 1 {
		t.Errorf("Wrong value, expected 1, but got %d", he)
	}

	llMap.Set("World", 100)
	wo, ok := llMap.Get("World")
	if ok != true {
		t.Error("Wrong get")
	}

	if wo != 100 {
		t.Errorf("Wrong value, expected 100, but got %d", wo)
	}

	containGo := llMap.Contains("Go")
	if containGo == true {
		t.Error("Wrong contain")
	}

	llMap.Remove("Hello")
	llMap.Remove("World")
	empty := llMap.IsEmpty()
	if empty != true {
		t.Error("Wrong empty")
	}

	_, ok = llMap.Get("Hello")
	if ok == true {
		t.Error("Wrong get, expected not contain Hello, but gou contain")
	}
}