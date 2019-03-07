export const gakki = (arr, count, sum) => {

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

// 增加缓存的版本
export const gakkiWithCache = (arr, count, sum) => {
  const n = num => {
    let count = 0, cache = {}
    if(cache[num]) return cache[num]
    while(num){
      count++
      num &= (num - 1)
    }
    return cache[num] = count
  }
  
  let len = arr.length, bit = 1 << len, res = []
  for(let i = 1; i < bit; i++){
    if(n(i) === count){
      let s = 0, temp = []
      for(let j = 0; j < len; j++){
        if((i & 1 << j) !== 0) {
          s += arr[j]
          temp.push(arr[j])
        }
      }

      if(s === sum){
        res.push(temp)
      }
    }
  }

  return res
}