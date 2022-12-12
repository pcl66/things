'use strict'
function init(vm) {
  // vm['handle'] = function() {
  //   console.log('this', this)
  // }
  vm['handle'] = () => {
    console.log('this', this)
  }
}
let vm = {}
init(vm)
vm.handle()