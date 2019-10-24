const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
app.use(bodyParser.json())
app.use(express.static('view/assets'))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./view/home.html'))
})

module.exports = {app}
