const http = require('http')
const router = require('./controller/router')
const db = require('./model/db')

const col_entradas = 'entradas'
const col_users = 'users'

db.database.on('error',console.error.bind(console,'Erro de conexão:'))
db.database.once('open',
()=> router.app.listen(3000,
()=> console.log('Servidor rodando na porta 3000')))