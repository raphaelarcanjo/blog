const userModel = require('../model/userModel')

const index = (req, res) => {
    res.locals.logged = req.session.logged
    res.render('pages/home')
}

const about = (req, res) => {
    res.locals.logged = req.session.logged
    res.render('pages/sobre')
}

const contact = (req, res) => {
    res.locals.logged = req.session.logged
    res.render('pages/contato')
}

module.exports = {
    index,
    about,
    contact
}