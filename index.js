const db = require('./model/db')
const router = require('./controller/router')
const port = process.env.PORT || 5000

db.database.on('error', console.error.bind(console, 'Erro de conexão:'))
db.database.once('open', () => router.app.listen(port, () => console.log('Servidor rodando na porta 5000')))