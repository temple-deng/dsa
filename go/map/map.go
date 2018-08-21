package selfmap

// 算了算了，还是在没搞清楚 go 的泛型前不折腾泛型了
type Map interface {
	Add(key string, value int)
	Remove(key string) (int, bool)
	Contains(key string) bool
	Get(key string) (int, bool)
	Set(key string, value int) error
	GetSize() int
	IsEmpty() bool
}