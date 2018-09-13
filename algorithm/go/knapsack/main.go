package main

func Knapsack(w []int, v []int, W int) int {
	n := len(w)
	f := make([]([]int), W + 1)

	for i := 0; i <= W; i++ {
		f[i] = make([]int, n+1)
		// for j := 0; j <= n; j++ {
		// 	f[i][j] = -1
		// }
	}

	
}


func MFKnapsack(n int, W int) int {
	f := make([]([]int), W + 1)

	for i := 0; i < W + 1; i++ {
		f[i] = make([]int, n+1)
	}

	return mFKnapsack(n, W)
}

func mFKnapsack(i int, j int) int {

}