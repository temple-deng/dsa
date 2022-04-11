/**
 * 
 */
export {}

// 先看暴力解法
function countSubstrings(s: string): number {
    let res = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (isPal(s, i, j)) {
                res++;
            }
        }
    }

    return res;
};

function isPal(s: string, l: number, r: number): boolean {
    while (l <= r) {
        if (s[l] === s[r]) {
            l++;
            r--;
        } else {
            return false;
        }
    }

    return true;
}

function countSubstrings2(s: string): number {
    let res = 0;

    // aaa  
    // i = 0
    for (let i = 0; i < s.length; i++) {
        res++;
        let l = i - 1;
        let r = i + 1;
        if (l >= 0) {
            if (s[l] === s[i]) {
                res++;
                l--;
                while (l >= 0 && r <= s.length - 1) {
                    if (s[l] === s[r]) {
                        res++;
                        l--;
                        r++;
                    } else {
                        break;
                    }
                }
            }

            l = i - 1;
            r = i + 1;
            while (l >= 0 && r <= s.length - 1) {
                if (s[l] === s[r]) {
                    res++;
                    l--;
                    r++;
                } else {
                    break;
                }
            }
        }
    }

    return res;
};