const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs')
const db = require('../model/db')

app.use(expressLayouts)

app.use(bodyParser.urlencoded())

app.use(express.static('assets'))

app.set('view engine','ejs')

app
  .get('/', (req,res) => res.render('pages/home'))
  .get('/cadastrar', (req,res) => res.render('pages/cadastrar'))
  .get('/sobre', (req,res) => res.render('pages/sobre'))
  .get('/contato', (req,res) => res.render('pages/contato'))
  .get('/conteudo/:user', (req,res) => res.render('pages/conteudo', {usuario: req.params.user}))
  .post('/login', (req,res) => {
    db.User.findOne({login: req.body.login.toLowerCase()}, (err, usr) => {
      if (usr != '' && req.body.senha == usr.senha) res.redirect('/conteudo/'+usr.nome+' '+usr.sobrenome)
      else res.render('pages/home', {erro: 'Usuário ou senha incorreto!'})
    })
  })
  .post('/registrar', (req, res) => {
    if (req.body.nome == '' || req.body.sobrenome == '' || req.body.email == '' || req.body.senha == '') res.render('pages/cadastrar', {erro: 'Todos os campos devem ser preenchidos!'})
    db.User.findOne({login: req.body.login.toLowerCase()}, (err, usr) => {
      if (usr != '') res.render('pages/cadastrar', {erro: 'Login já cadastrado'})
    })
    if (req.body.senha !== req.body.confirmar_senha) res.render('pages/cadastrar', {erro: 'A confirmação da senha não confere.'})
    else {
      new db.User({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        login: req.body.login.toLowerCase(),
        email: req.body.email,
        senha: req.body.senha
      }).save(err => {
        if (err) res.render('pages/cadastrar', {erro: 'Não foi possível se cadastrar. Favor contactar o administrador!'})
        else res.render('pages/home', {mensagem: 'Você se cadastrou com sucesso! Já pode se logar e criar o Seu Blog'})
      })
    }
  })

module.exports = {app}
