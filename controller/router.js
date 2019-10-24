const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const fs = require('fs')
app.use(bodyParser.json())
app.use(express.static('views/assets'))

app.get('/',(req,res)=>{
  let header = fs.readFileSync('./views/assets/header.html')
  let page = fs.readFileSync('./views/home.html')
  data = header + page
  res.send(data)
})

app.get('/:page',(req,res)=>{
  let header = fs.readFileSync('./views/assets/header.html')
  let page = fs.readFileSync('./views/'+req.params.page+'.html')
  data = header + page
  res.send(data)
})

module.exports = {app}
