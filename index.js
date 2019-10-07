const http = require('http');

const init = require('./controller/init');
const db = require('./model/db');

const col_entradas = 'entradas';
const col_users = 'users';

http.createServer((req,res)=>{
  init.loadView(req,res);
}).listen(3000,()=>console.log('Servidor rodando na porta 3000'));

http.createServer((req,res)=>{
  init.staticDir(req,res);
}).listen(3001,()=>console.log('Servidor rodando na porta 3001'))
