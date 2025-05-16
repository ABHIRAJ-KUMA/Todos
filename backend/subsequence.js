function lengthOfLIS(nums) {
  const sub = [];

  for (let num of nums) {
    let left = 0,
      right = sub.length;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (sub[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    sub[left] = num;
  }

  return sub.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
