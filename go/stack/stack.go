/**
 * 这里之所以将 Stack 定义为一个接口，是因为 Stack 的底层物理实现是有多种的
 * 而不是说但有一种实现，因此这里我们将 Stack 定义为一个接口，并定义一个 Stack
 * 接口该有的各种操作方法，至于其底层实现则不加限制
 */
package stack

type Stack interface {
	GetSize() int
	IsEmpty() bool
	Push(elem interface{})
	Pop() (interface{}, error)
	Peek() (interface{}, error)
}