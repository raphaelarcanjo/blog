// const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')

const dbname = 'blog'
const dburl = 'mongodb://localhost:27017/'

mongoose.connect(dburl+dbname, {useNewUrlParser:true, useUnifiedTopology:true})

const database = mongoose.connection

module.exports = {ObjectID,database}
