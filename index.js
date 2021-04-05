const config = require('./core/config')
const router = require('./core/router')
const db = require('./core/database')

db.conn.on('error', console.error.bind(console, 'Erro de conexão:'))
db.conn.once('open', () => router.app.listen(config.port, () => console.log(`Servidor rodando na porta ${config.port}`)))