const db = require('./db');

const getAll = (collection)=> db.getDB().collection(collection).find({}).toArray((err,documents)=> documents);

module.exports = {getAll};