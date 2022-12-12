// 声明promise构造函数
function Promise(executor) {
  //#region  给实例对象添加属性
  this.promiseState = 'pending'
  this.promiseResult = null
  this.callbacks = []
  // 将this指向_this
  const _this = this
  //#endregion 

  // 声明resolve函数
  function resolve(data) {
    // 判断promise的状态是否已经被修改
    if (_this.promiseState !== 'pending') return
    // 1. 修改state的状态为fulfilled
    _this.promiseState = 'fulfilled'
    // 2. 设置result的值
    _this.promiseResult = data
    // 3. 异步任务执行成功的回调
    if (_this.callbacks.length !== 0) {
      _this.callbacks.forEach(item => {
        item.onResolved(data)
      })
    }
  }
  
  // 声明reject函数
  function reject(data) {
    // 判断promise的状态是否已经被修改
    if (_this.promiseState !== 'pending') return
    // 1. 修改state的状态为rejected
    _this.promiseState = 'rejected'
    // 2. 设置result的值
    _this.promiseResult = data
    // 3. 异步任务执行失败的回调
    if (_this.callbacks.length !== 0) {
      _this.callbacks.forEach(item => {
        item.onRejected(data)
      })
    }
  }

  //#region 同步执行executor(执行器)函数
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
  //#endregion
}

// 在Promise原型上添加实例方法then
Promise.prototype.then = function (onResolved, onRejected) {
  // 如果状态为成功，执行成功的回调
  if (this.promiseState === 'fulfilled') {
    onResolved(this.promiseResult)
  }
  // 如果状态为失败，执行失败的回调
  if (this.promiseState === 'rejected') {
    onRejected(this.promiseResult)
  }
  if (this.promiseState === 'pending') {
    // 保存成功和失败的回调函数
    this.callbacks.push({
      onResolved,
      onRejected,
    })
  }
}
