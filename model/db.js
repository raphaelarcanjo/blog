const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbname = 'blog'
const dburl = 'mongodb://localhost:27017/'

mongoose.connect(dburl+dbname, {useNewUrlParser:true, useUnifiedTopology:true})

const database = mongoose.connection

const userSchema = new Schema ({
    nome: String,
    sobrenome: String,
    email: String,
    login: String,
    senha: String,
})

const User = mongoose.model('User', userSchema)

module.exports = {ObjectID,database, User}
