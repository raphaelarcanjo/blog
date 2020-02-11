const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs')

app.use(expressLayouts)

app.use(bodyParser.urlencoded())

app.use(express.static('assets'))

app.set('view engine','ejs')

app
  .get('/', (req,res) => res.render('pages/home'))
  .get('/cadastrar', (req,res) => res.render('pages/cadastrar'))
  .get('/sobre', (req,res) => res.render('pages/sobre'))
  .get('/contato', (req,res) => res.render('pages/contato'))
  .post('/login', (req,res) => {
    if (req.body.login.toLowerCase() == "admin" && req.body.senha == "123456") res.send('LOGGED')
    else res.send('NOT LOGGED')
  })

module.exports = {app}
