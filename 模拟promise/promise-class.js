class Promise {
  state = 'pending'
  result = undefined
  cb = []
  #resolve(value) {
    if(this.state !== 'pending') return
    this.state = 'fulfilled'
    this.result = value
    setTimeout(() => {
      this.cb.forEach(({ onResolved }) => onResolved())
    })
  }
  #reject(reason) {
    if(this.state !== 'pending') return
    this.state = 'rejected'
    this.result = reason
    setTimeout(() => {
      this.cb.forEach(({ onRejected }) => onRejected())
    })
  }
  constructor(executor) {
    try {
      executor(this.#resolve, this.#reject)
    } catch (e) {
      this.#reject(e)
    }
  }
  then(onResolved = e => e , onRejected = r => { throw r }) {
    return new Promise((resolve, reject) => {
      if(this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = onResolved(this.result)
            if(result instanceof Promise) {
              result.then(v => resolve(v), r => reject(r))
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
      if(this.state === 'rejected') {
        setTimeout(() => {
          try {
            const result = onRejected(this.result)
            if(result instanceof Promise) {
              result.then(v => resolve(v), r => reject(r))
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
      if(this.state === 'pending') {
        this.cb.push({
          onResolved: () => {
            try {
              const result = onResolved(this.result)
              if(result instanceof Promise) {
                result.then(v => resolve(v), r => reject(r))
              } else {
                resolve(result)
              }
            } catch (e) {
              reject(e)
            }
          },
          onRejected: () => {
            try {
              const result = onRejected(this.result)
              if(result instanceof Promise) {
                result.then(v => resolve(v), r => reject(r))
              } else {
                resolve(result)
              }
            } catch (e) {
              reject(e)
            }
          }
        })
      }
    })
  }
}