package trie

import (
	"testing"
)

func TestTrieAdd(t *testing.T) {
	trie := New()
	trie.Add("apple")
	trie.Add("bad")
	trie.Add("dad")

	size := trie.GetSize()
	if size != 3 {
		t.Errorf("Wrong size, expected 3, but got %d", size)
	}
}

func TestTrieContains(t *testing.T) {
	trie := New()

	trie.Add("apple")
	trie.Add("bad")
	trie.Add("dad")

	contains := trie.Contains("apple")
	if !contains {
		t.Error("Wrong contains result, expected contains apple, but got not contains")
	}

	contains = trie.Contains("bad")
	if !contains {
		t.Error("Wrong contains result, expected contains bad, but got contains")
	}

	contains = trie.Contains("hhhh")
	if contains {
		t.Error("Wrong contains result, expected not contains hhhh, but got true")
	}
}

func TestTrieIsPrefix(t *testing.T) {
	trie := New()

	trie.Add("apple")
	trie.Add("bad")
	trie.Add("dad")

	isPrefix := trie.IsPrefix("apple")
	if !isPrefix {
		t.Error("Wrong isPrefix result, expected apple is prefix, but got false")
	}

	isPrefix = trie.IsPrefix("bad")
	if !isPrefix {
		t.Error("Wrong isPrefix result, expected bad is prefix, but got false")
	}

	isPrefix = trie.IsPrefix("hhhh")
	if isPrefix {
		t.Error("Wrong isPrefix result, expected hhhh is not prefix, but got true")
	}

	isPrefix = trie.IsPrefix("a")
	if !isPrefix {
		t.Error("Wrong isPrefix result, expected a is prefix, but got false")
	}
}