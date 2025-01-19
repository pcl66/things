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
      this.cb.forEach(item => item?.onResolved())
    })
  }
  #reject(reason) {
    if(this.state !== 'pending') return
    this.state = 'rejected'
    this.result = reason
    setTimeout(() => {
      this.cb.forEach(item => item?.onRejected())
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
      const handler = (thatHandler) => {
        try {
          const res = thatHandler(that.result)
          if(res instanceof Promise) {
            res.then(v => {resolve(v)}, r => {reject(r)})
          } else {
            resolve(res)
          }
        } catch (error) {
          reject(error)
        }
      }
      if(that.state === 'resolved') {
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
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  finally(onFinally) {
    return this.then(v => {
      onFinally()
      return v
    }, r => {
      onFinally()
      throw r
    })
  }

  static all(iterable) {
    const promises = Array.from(iterable).map(v => v instanceof Promise ? v : Promise.resolve(v))
    let count = 0
    const result = []
    const length = promises.length
    return new Promise((resolve,reject) => {
      promises.forEach((item, index) => {
        item.then(v => {
          count++
          result[index] = v
          if(count === length) {
            resolve(result)
          }
        }, r => {
          reject(r)
        })
      })
    })
  }
  static race(iterable) {
    const promises = Array.from(iterable).map(v => v instanceof Promise ? v : Promise.resolve(v))
    return new Promise((resolve,reject) => {
      promises.forEach(item => {
        item.then(v => {
          resolve(v)
        }, r => {
          reject(r)
        })
      })
    })
  }
  static resolve(value) {
    if(value instanceof Promise) {
      return value
    }
    return new Promise(resolve => resolve(value))
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
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
  constructor(capacity) {
    this.size = capacity
    this.container = new Map()
  }
  get(key) {
    if(!this.container.has(key)) return -1
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
function tree2Array(tree) {
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
function array2Tree(arr) {
  const result = []
  const map = new Map()
  arr.forEach(item => map.set(item.id, item))
  arr.forEach(item => {
    const parent = map.get(item.parentId)
    if(parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// deepClone
const deepClone = (rawData, cache = new WeakMap()) => {
  if(rawData === null || typeof rawData !== 'object') {
    return rawData
  }
  if(cache.has(rawData)) return cache.get(rawData)
  let clonedData
  const type = Object.prototype.toString.call(rawData)
  if(type === '[object Object]') {
    clonedData = {}
  } else if (type === '[object Array]') {
    clonedData = []
  } else {
    throw new Error('不支持的数据类型')
  }
  cache.set(rawData, clonedData)
  Object.entries(rawData).forEach(([key, value]) => {
    clonedData[key] = deepClone(value, cache)
  })
}

// Function bind call

// iterator

// myNew
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}

// EventHub

// debounce throttle

// 模板匹配

// 字符串加法

// 并行任务调度器
class Scheduler {
  constructor(max) {
    this.max = max
    this.runningCount = 0
    this.promiseQueue = []
  }
  async add(fn) {
    if(this.runningCount >= this.max) {
      await new Promise(resolve => this.promiseQueue.push(resolve))
    }
    this.runningCount++
    const res = await fn()
    this.runningCount--
    this.promiseQueue.length && this.promiseQueue.shift()()
    return res
  }
}

// 全排列

// 快速排序

// 原地快排

// 归并排序

// 斐波那契数列
function fib(n) {
  if(n < 1) return 0
  if(n < 2) return 1
  if(n < 3) return 1
  return fib(n-2) + fib(n-1)
}

// DFS 递归

// DFS 迭代

// BFS