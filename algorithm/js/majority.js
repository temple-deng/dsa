function majority(arr) {
  if (arr.length === 0) {
    throw new Error("Empty error");
  }

  let winner = arr[0];
  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (count === 0) {
      winner = arr[i];
      count++;
    } else {
      if (arr[i] === winner) {
        count++;
      } else {
        count--;
      }
    }
  }

  count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === winner) {
      count++;
    }
  }

  if (arr.length / 2 < count) {
    return winner;
  }
  return -1;
}