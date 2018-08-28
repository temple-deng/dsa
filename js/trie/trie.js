class Node {
  constructor() {
    this.isWord = false;
    this.next = new Map();
  }
}
class Trie {
  constructor() {
    this.root = new Node();
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  add(word) {
    let cur = this.root;
    for(let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!cur.next.has(char)) {
        let node = new Node();
        cur.next.set(char, node);
      }
      cur = cur.next.get(char);
    }

    if (!cur.isWord) {
      cur.isWord = true;
      this.size++;
    }
  }

  contains(word) {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!cur.next.has(char)) {
        return false;
      }
      cur = cur.next.get(char);
    }

    return cur.isWord;
  }

  isPrefix(word) {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!cur.next.has(char)) {
        return false;
      }
      cur = cur.next.get(char);
    }

    return true;
  }
}