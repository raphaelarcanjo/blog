const config = require('./config.js')
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')

mongoose.connect(config.dburl + config.dbname, { useNewUrlParser: true, useUnifiedTopology: true })

const conn = mongoose.connection

module.exports = {
    ObjectID,
    mongoose,
    conn
}