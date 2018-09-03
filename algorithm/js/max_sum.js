/**
 * 最大子序列和
 */
function maxSum(arr) {
  let a = 0,
    b = 0;
  for (let i = 0; i < arr.length; i++) {
    b = Math.max(b + arr[i], 0);
    a = Math.max(a, b);
  }

  return a;
}