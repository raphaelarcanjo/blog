const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbname = 'blog';
const dburl = 'mongodb://localhost:27017';

const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser:true
};

const state = {
  db:null
};

const connect = (cb)=>{
  if (state.db)
    cb();
  else{
    MongoClient.connect(dburl,mongoOptions,(err,client)=>{
      if(err)
        cb(err);
      else{
        state.db = client.db(dbname);
        cb();
      }
    });
  }
}

const getPrimaryKey = (_id)=>{
  return ObjectID(_id);
}

const getDB = ()=>{
  return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};
