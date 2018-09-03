function BinarySearch(arr, elem) {
  var low = 0;
  var high = arr.length - 1;

  while(low !== high) {
    var midIndex = Math.floor((high-low)/2) + low;
    var mid = arr[midIndex]
    if (mid === elem) {
      return midIndex
    } else if (mid > elem) {
      high = midIndex - 1;
    } else {
      low = midIndex + 1
    }
  }

  return -1
}