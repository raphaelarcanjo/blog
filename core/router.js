const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()

const userController = require("../controller/userController")
const homeController = require("../controller/homeController")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(
    session({
        secret: 'raphaelarcanjo',
        resave: false,
        rolling: true,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1800000 }
    })
)
app.use(expressLayouts)
app.use(express.static('assets'))
app.set('view engine', 'ejs')
app
    .get('/', (req, res) => {
        homeController.index(req, res)
    })
    .get('/cadastrar', (req, res) => userController.register(req, res))
    .get('/sobre', (req, res) => homeController.about(req, res))
    .get('/contato', (req, res) => homeController.contact(req, res))
    .get('/conteudo/:user', (req, res) => userController.getUser(req, res, user))
    .get('/logout', (req, res) => userController.logout(req, res))
    .post('/login', (req, res) => userController.login(req, res))
    .post('/cadastrar', (req, res) => userController.saveUser(req, res))

module.exports = {
    app
}