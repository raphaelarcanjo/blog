const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs')
const db = require('../model/db')

app.use(cookieParser())

app.use(session({
  secret: 'raphaelarcanjo',
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1800000 }
}))

app.use(expressLayouts)

app.use(bodyParser.urlencoded())

app.use(express.static('assets'))

app.set('view engine','ejs')

app
  .get('/', (req,res) => {
    res.locals.logged = req.session.logged
    res.render('pages/home')
  })
  .get('/cadastrar', (req,res) => {
    res.locals.logged = req.session.logged
    res.render('pages/cadastrar')
  })
  .get('/sobre', (req,res) => {
    res.locals.logged = req.session.logged
    res.render('pages/sobre')
  })
  .get('/contato', (req,res) => {
    res.locals.logged = req.session.logged
    res.render('pages/contato')
  })
  .get('/conteudo/:user', (req,res) => {
    res.locals.logged = req.session.logged
    db.User.findOne({login: req.params.user}, (err, user) => {
      if (user != '') {
        res.locals.usuario = user.nome+' '+user.sobrenome
        res.locals.login = user.login
        res.locals.email = user.email
        res.render('pages/conteudo')
      }
      else res.render('pages/home', {erro: 'Blog não encontrado!'})
    })
  })
  .get('/logout', (req,res) => {
    req.session.logged = false
    res.locals.mensagem = 'Deslogado com sucesso. Aguardamos seu retorno!'
    res.redirect('/')
  })
  .post('/login', (req,res) => {
    db.User.findOne({login: req.body.login.toLowerCase()}, (err, user) => {
      if (user != '' && req.body.senha == user.senha) {
        req.session.logged = true
        res.redirect('/conteudo/'+user.login)
      }
      else res.render('pages/home', {erro: 'Usuário ou senha incorreto!'})
    })
  })
  .post('/registrar', (req, res) => {
    if (req.body.nome == '' || req.body.sobrenome == '' || req.body.email == '' || req.body.senha == '') res.render('pages/cadastrar', {erro: 'Todos os campos devem ser preenchidos!'})
    db.User.findOne({login: req.body.login.toLowerCase()}, (err, user) => {
      if (user != '') res.render('pages/cadastrar', {erro: 'Login já cadastrado'})
    })
    if (req.body.senha !== req.body.confirmar_senha) res.render('pages/cadastrar', {erro: 'A confirmação da senha não confere.'})
    else {
      new db.User({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        login: req.body.login.toLowerCase(),
        email: req.body.email,
        senha: req.body.senha
      })
      .save(err => {
        if (err) res.render('pages/cadastrar', {erro: 'Não foi possível se cadastrar. Favor contactar o administrador!'})
        else res.render('pages/home', {mensagem: 'Você se cadastrou com sucesso! Já pode se logar e criar o Seu Blog'})
      })
    }
  })

module.exports = {app}
