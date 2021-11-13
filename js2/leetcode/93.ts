/**
 * @file 93. 复原 IP 地址
 * @link https://leetcode-cn.com/problems/restore-ip-addresses/
 */

export function restoreIpAddresses(s: string): string[] {
    if (s.length < 4) {
        return [];
    }

    const res = [];
    for (let i = )
};

function isIpAddr(s: string): boolean {
    const arr = s.split('.');

    for (let i = 0; i < arr.length; i++) {
        const num = Number(arr[i]);
        if (num > 255 || (num && arr[i][0] === '0')) {
            return false;
        }
    }

    return true;
}