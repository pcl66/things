class Tip {
  constructor() {
    this.ele = document.createElement('div')
    this.ele.className = 'tip'
    document.body.appendChild(this.ele)
    this.bindEvent()
  }
  setContent(options) {
    this.title = options.title
    this.content = options.content
    this.ele.innerHTML = `
        <div class="header">
          <div class="title">${this.title}</div>
          <div class="close">x</div>
        </div>
        <div class="content">
          <div>${this.content}</div>
        </div>
        <div class="footer">
          <button>确认</button>
          <button>取消</button>
        </div>
    `
  }
  bindEvent() {
    this.ele.addEventListener('click', (e) => {
      if(e.target.className === 'close') {
        console.log(this.ele)
        this.ele.style.display = 'none'
      }
    })
  }
}
