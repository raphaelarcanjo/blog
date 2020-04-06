const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbname = 'blog'
const dburl = 'mongodb://localhost:27017/'

mongoose.connect(dburl + dbname, { useNewUrlParser: true, useUnifiedTopology: true })

const database = mongoose.connection

const userSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    login: String,
    senha: String,
})

const postsSchema = new Schema({
    usuario: String,
    posts: {
        post: String,
        type: String,
        public: Boolean
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const User = mongoose.model('User', userSchema)
const Posts = mongoose.model('Posts', postsSchema)

module.exports = { ObjectID, database, User, Posts }