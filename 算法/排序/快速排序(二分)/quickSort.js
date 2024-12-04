// const a = [1,2,3,5,3,2,3,88,1,0,2,100,55]
let a = [366, 240, 866, 115,  -9, 760,1,1,1,1, 553, 354, 232, 374, 450, 426, 944, 2,393, 143]
// let a = [2,5,2,6,7,10,8,9]

// function quickSort(arr) {
//   if(arr.length < 2) {
//     return arr
//   }
//   let flag = arr[0]
//   let left = []
//   let right = []
//   for(let i = 1; i < arr.length; i++) {
//     if(arr[i] <= flag) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   return quickSort(left).concat(flag, quickSort(right))
// }

// // 原地快排
// function quick(arr, start, end) {
//   let init = start
//   const flag = arr[init]
//   start++
//   while(start <= end) {
//     while(arr[start] < flag) {
//       start++
//     }
//     while(arr[end] > flag) {
//       end--
//     }
//     if(start < end) {
//       [arr[start], arr[end]] = [arr[end], arr[start]]
//       start++
//       end--
//     }
//   }
//   [arr[init], arr[start - 1]] = [arr[start - 1], arr[init]]
//   return start
// }
// function quickSort1(arr, start, end) {
//   if(start < end) {
//     let index = quick(arr, start, end)
//     quickSort1(arr, start, index - 1)
//     quickSort1(arr, index, end)
//   }
//   return arr
// }

function quick1(arr,start,end){
  // 双指针
  let init = start
  let flag = arr[init]
  start++
  while(start<=end){
    while(arr[end]>flag){
      end--
    }
    while(arr[start]<flag){
      start++ 
    }
    if(start<end){
      [arr[start],arr[end]] = [arr[end],arr[start]]
      start++
      end--
    }
  }
  [arr[init],arr[start-1]] = [arr[start-1],arr[init]]
  return start
}
function quickSort2(arr,start,end){
  if(start<end){
    let index = quick1(arr,start,end) //标志位的值
    quickSort2(arr,start,index-1)
    quickSort2(arr,index,end)
  }
  return arr
}


function quickSort3(arr, left, right) {
  if(left > right) return
  let base = arr[left]
  let i = left
  let j = right
  while(i !== j) {
    while(arr[j] >= base && i < j) {
      j--
    }
    while(arr[i] <= base && i < j) {
      i++
    }
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  arr[left] = arr[i]
  arr[i] = base
  console.log('pivot', i)
  console.log('arr', arr)
  quickSort3(arr, left, i - 1)
  quickSort3(arr, i + 1, right)
  return arr
}

function quick4(arr, left, right) {
  let init = left
  let flag = arr[init]
  while(left !== right) {
    while(flag <= arr[right] && left < right) {
      right--
    }
    while(flag >= arr[left] && left < right) {
      left++
    }
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
  }
  arr[init] = arr[left]
  arr[left] = flag
  console.log('pivot', left)
  console.log('arr', arr)
  return left
}
function quickSort4(arr, left, right) {
  if(left < right) {
    const pivot = quick4(arr, left, right)
    quickSort4(arr, left, pivot -1)
    quickSort4(arr, pivot + 1, right)
  }
  return arr
}

// console.log(quickSort(a))
// quickSort2(a,0,a.length - 1)
// console.log('快拍',quickSort3(a, 0, a.length - 1))
console.log('xxxx', quickSort4(a, 0, a.length - 1))