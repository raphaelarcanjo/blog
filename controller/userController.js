const userModel = require('../model/userModel')
const postModel = require('../model/postModel')

const getContent = (req, res, user_id) => {
    res.locals.logged = req.session.logged

    userModel.User.findOne({ login: req.params.user }, (err, user) => {
        if (user != null) {
            postModel.Post.findOne({ usuario: req.params.user }, (err, pts) => {
                res.locals.usuario = user.nome + ' ' + user.sobrenome
                res.locals.login = user.login
                res.locals.email = user.email
                res.locals.posts = pts
                res.render('pages/conteudo')
            })
        } else res.render('pages/home', { erro: 'Blog não encontrado!' })
    })
}

const logout = (req, res) => {
    req.session.logged = false
    res.locals.mensagem = 'Deslogado com sucesso. Aguardamos seu retorno!'
    res.redirect('/')
}

const login = (req, res) => {
    userModel.User.findOne({ login: req.body.login.toLowerCase() }, (err, user) => {
        if (user != '' && req.body.senha == user.senha) {
            req.session.logged = true
            res.redirect('/conteudo/' + user.login)
        } else res.render('pages/home', { erro: 'Usuário ou senha incorreto!' })
    })
}

const register = (req, res) => {
    res.locals.logged = req.session.logged
    res.render('pages/cadastrar')
}

const saveUser = (req, res) => {
    res.json({requestBody: req.body})
    
    if (req.body.nome == '' || req.body.sobrenome == '' || req.body.email == '' || req.body.senha == '') res.render('pages/cadastrar', { erro: 'Todos os campos devem ser preenchidos!' })
    userModel.User.findOne({ login: req.body.login.toLowerCase() }, (err, user) => {
        if (user != '') res.render('pages/cadastrar', { erro: 'Login já cadastrado' })
    })
    if (req.body.senha !== req.body.confirmar_senha) res.render('pages/cadastrar', { erro: 'A confirmação da senha não confere.' })
    else {
        new userModel.User({
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                login: req.body.login.toLowerCase(),
                email: req.body.email,
                senha: req.body.senha
            })
            .save(err => {
                if (err) res.render('pages/cadastrar', { erro: 'Não foi possível se cadastrar. Favor contactar o administrador!' })
                else res.render('pages/home', { mensagem: 'Você se cadastrou com sucesso! Já pode se logar e criar o Seu Blog' })
            })
    }
}

module.exports = {
    getContent,
    logout,
    login,
    register,
    saveUser
}