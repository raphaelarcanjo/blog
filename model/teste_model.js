const db = require('./db');

const getAll = (collection)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>console.log(documents));
}

module.exports = {getAll};