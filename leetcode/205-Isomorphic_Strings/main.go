package main

// 给定两个字符串 s 和 t，判断它们是否是同构的。
// 如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。
// 所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上
// 但字符可以映射自己本身。
// 这个题其实和 290 问题的差别不大

func isIsomorphic(s string, t string) bool {
	n := len(s)

	auxMap := make(map[uint8]uint8)
	// 只是当集合使，其实键值的类型不重要
	set := make(map[uint8]bool)

	for i := 0; i < n; i++ {
		x := t[i]
		y := s[i]
		
		val, mapOk := auxMap[x]
		_, setOk := set[y]
		// 如果 x->y 没有建立起映射，并且 y 没有与其他 x 建立映射
		if !mapOk && !setOk {
			auxMap[x] = y
			set[y] = true
		} else if mapOk {
			if val != y {
				return false
			}
		} else {
			return false
		}
	}
	return true
}

func main() {
	
}