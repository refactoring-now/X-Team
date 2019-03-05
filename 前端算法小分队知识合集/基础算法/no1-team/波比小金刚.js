const gakki = (arr, count, sum) => {

  const n = num => {
    let count = 0
    while (num) {
      num = num & (num - 1)
      count ++
    }
    return count
  }

  let length = arr.length
  let bit = 1 << length
  for (let i = 0; i < bit; i ++) {
    let s = 0
    temp = []
    if (n(i) === count) {
      for (let j = 0; j < length; j++) {
        if ((i & 1 << j) !== 0) {
          s += arr[j]
          temp.push(arr[j])
        }
      }
      if (s === sum) {
        console.log(temp)
      }
    }
  }
}

gakki([1, 2, 3, 4, 5], 2, 6)