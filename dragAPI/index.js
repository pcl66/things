const data = [
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444'
]

let target = null
let dragging = null

function render() {
  createList()
  startListen()
}

function createList () {
  const oDragWrapper = document.querySelector('.draggable-wrapper')
  data.forEach(item => {
    const oLi = document.createElement('li')
    oLi.innerHTML = item
    oLi.draggable = true
    oDragWrapper.appendChild(oLi)
  })
}

function startListen() {
  const oLis = document.querySelectorAll('li')
  oLis.forEach(item => {
    item.addEventListener('dragstart', hDragStart)
    item.addEventListener('dragend', hDragEnd)
  })
  const oDragWrapper = document.querySelector('.draggable-wrapper')
  oDragWrapper.addEventListener('dragover', (e) => {
    e.preventDefault()
    const oTargetLis = Array.from(document.querySelectorAll('li:not(.dragging)'))
    dragging = oDragWrapper.querySelector('.dragging')
    target = oTargetLis.find(item => e.clientY < item.offsetTop + item.offsetHeight / 2)
    oDragWrapper.insertBefore(dragging, target)
  })
  window.addEventListener('dragover', e => {
    e.preventDefault()
  })
}

function hDragStart () {
  const that = this
  setTimeout(() => {
    that.classList.add('dragging')
  })
}

function hDragEnd () {
  const that = this
  const oDragWrapper = document.querySelector('.draggable-wrapper')
  that.classList.remove('dragging')
}

render()