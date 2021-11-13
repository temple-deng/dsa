/**
 * @file 341 341. 扁平化嵌套列表迭代器
 * @link https://leetcode-cn.com/problems/flatten-nested-list-iterator/
 * @description 应该就是一个普通的递归问题
 */

// This is the interface that allows for creating nested lists.
// You should not implement it, or speculate about its implementation
class NestedInteger {
    // If value is provided, then it holds a single integer
    // Otherwise it holds an empty nested list
    constructor(value?: number) {
        // ...
    };

    // Return true if this NestedInteger holds a single integer, rather than a nested list.
    isInteger(): boolean {
        // ...
    };

    // Return the single integer that this NestedInteger holds, if it holds a single integer
    // Return null if this NestedInteger holds a nested list
    getInteger(): number | null {
        // ...
    };

    // Set this NestedInteger to hold a single integer equal to value.
    setInteger(value: number) {
        // ...
    };
    // Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
    add(elem: NestedInteger) {
        // ...
    };
    // Return the nested list that this NestedInteger holds,
    // or an empty list if this NestedInteger holds a single integer
    getList(): NestedInteger[] {
        //...
    };
};


export  class NestedIterator {
    res: number[] = [];
    list: NestedInteger[];
    nextIndex = 0;

    constructor(nestedList: NestedInteger[]) {
		this.list = nestedList;
        this.flat(this.list);
    }

    flat(list: NestedInteger[]) {
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isInteger()) {
                this.res.push(item.getInteger()!);
            } else {
                const nestList = item.getList();
                this.flat(nestList);
            }
        }
    }

    hasNext(): boolean {
		if (this.nextIndex === this.res.length) {
            return false;
        }
        return true;
    }

	next(): number {
		const ret = this.res[this.nextIndex];
        this.nextIndex++;
        return ret;
    }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new NestedIterator(nestedList)
 * var a: number[] = []
 * while (obj.hasNext()) a.push(obj.next());
 */