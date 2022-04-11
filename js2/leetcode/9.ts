function isPalindrome(x: number): boolean {
    const str = String(x);

    let l = 0;
    let r = str.length - 1;
    while (l < r) {
        if (str[l] === str[r]) {
            l++;
            r--;
        } else {
            return false;
        }
    }
    return true
};

export {}



