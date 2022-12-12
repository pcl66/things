let length = 20
let obj = {
  length: 100,
  sayHi() {
    console.log(this.length)
  }
}
const fn = obj.sayHi
console.dir(fn)
fn()
function f1() {}