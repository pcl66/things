// promise
class Promise {
  state = 'pending'
  result
  cb = []
  #resolve(value) {
    if(this.state !== 'pending') return
    this.state = 'resolved'
    this.result = value
    setTimeout(() => {
      this.cb.forEach(item => item.onResolved())
    })
  }
  #reject(reason) {
    if(this.state !== 'pending') return
    this.state = 'rejected'
    this.result = reason
    setTimeout(() => {
      this.cb.forEach(item => item.onRejected())
    })
  }

  constructor(executor) {
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this))
    } catch (error) {
      this.#reject(error)
    }
  }
  then(onResolved, onRejected) {
    const that = this
    return new Promise((resolve, reject) => {
      const handler = (cb) => {
        try {
          const res = cb(that.result)
          if(res instanceof Promise) {
            res.then(v => {
              resolve(v)
            }, r => {
              reject(r)
            })
          }
        } catch (error) {
          reject(error)
        }
      }
      if(that.state === 'resolve') {
        handler(onResolved)
      }
      if(that.state === 'rejected') {
        handler(onRejected)
      }
      if(that.state === 'pending') {
        that.cb.push({
          onResolved: () => handler(onResolved),
          onRejected: () => handler(onRejected)
        })
      }
    })
  }
  catch() {}
  finally() {}
  
  static all() {}
  static race() {}
  static resolve() {}
  static reject() {}
}
// currying
function currying(fn, ...args1) {
  return function(...args2) {
    const allArgs = [...args1, ...args2]
    if(fn.length > allArgs.length) {
      return currying(fn, ...allArgs)
    } else {
      return fn.call(this, ...allArgs)
    }
  }
}

// LRU
class LRU {
  constructor(capacity){
    this.size = capacity
    this.container = new Map()
  }
  get(key) {
    if(!this.container.has(key)) return
    const _target = this.container.get(key)
    this.container.delete(key)
    this.container.set(key, _target)
    return _target
  }
  put(key, value) {
    if(this.container.has(key)) {
      this.container.delete(key)
    } else if (this.container.size >= this.size) {
      const _key = this.container.keys().next().value
      this.container.delete(_key)
    }
    this.container.set(key, value)
  }
}

// Tree2Array
const tree2Array = (tree) => {
  const result = []
  tree.forEach(item => {
    if(item.children) {
      result.push({...item}, ...tree2Array(item.children))
    } else {
      result.push({...item})
    }
  })
  return result
}

// Array2Tree
const array2Tree = (arr) => {
  const result = []
  const map = new Map()
  arr.forEach(item => map.set(item.id, item))
  arr.forEach(item => {
    const parent = map(item.parentId)
    if(parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// deepClone

// Function bind call

// iterator

// myNew

// EventHub

// debounce throttle

// 模板匹配

// 字符串加法

// 并行任务调度器

// 全排列(回溯)

// 快速排序

// 原地快排

// 归并排序

// 斐波那契数列

// DFS 递归

// DFS 迭代

// BFS

// 实现一个数组乱序
const randomArr = (arr) => {
  let _arr = [...arr]
  let cur = 0
  while(_arr.length > 0) {
    const index = Math.floor(Math.random()*_arr.length)
    arr[cur++] = _arr.splice(index,1)[0]
  }
  return arr
}

const aaa = [1,2,3,4,5]
console.log(randomArr(aaa))