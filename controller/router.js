const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const fs = require('fs')
app.use(bodyParser.json())

let options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['css','js','png','jpg','svg','ico'],
  index: false,
  maxAge: '1d',
  redirect: false
}
app.use(express.static('views/assets',options))

app.get('/*',(req,res)=>{
  let url = req.path.split('/')
  let header = fs.readFileSync('./views/assets/header.html')
  let footer = fs.readFileSync('./views/assets/footer.html')
  let page = ''

  if(url.length > 2) {
    let controller = require('./'+url[1])
    let func = url[2]
    if(url.length > 3) {
      controller[func](url.slice(3))
    }
    else controller[func]()
  }
  else if(url[1] != '' && url[1] != 'favicon.ico') {
    page = fs.readFileSync('./views/'+url[1]+'.html')
    data = header + page + footer
    res.send(data)
  }
  else{
    page = fs.readFileSync('./views/home.html')
    data = header + page + footer
    res.send(data)
  }
})

module.exports = {app}
