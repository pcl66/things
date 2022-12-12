const express = require('express')
const bodyParser = require('body-parser')
const uploader = require('express-fileupload')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(uploader())

// 处理跨域问题
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST,GET')
  next()
})

// api
app.post('/upload_video', (req, res) => {
  res.send({
    msg: 'ok',
    code: 0
  })
})
app.get('/hello', (req, res) => {
  res.send({
    msg: 'hello',
    code: 0
  })
})

app.listen(8001, () => {
  console.log('server is running on 8001')
})