const config = require('./config')
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')

mongoose.connect(config.dburl + config.dbname, { useNewUrlParser: true, useUnifiedTopology: true })

const conn = mongoose.connection

module.exports = {
    conn,
    mongoose,
    ObjectID
}