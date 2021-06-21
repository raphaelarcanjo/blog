const config = require('./core/config')
const router = require('./core/router')
const database = require('./core/database')

database.conn.on('error', console.error.bind(console, 'Erro de conexão:'))
database.conn.once('open', () =>
    router.app.listen(config.port, () =>
        console.log(`Servidor rodando na porta ${config.port}`
        )
    )
)