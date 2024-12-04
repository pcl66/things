const a = [1,2,3,5,3,2,3,88,1,0,-2,100,55]

function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

console.log(bubbleSort(a))