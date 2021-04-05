const db = require('../core/database')
const Schema = db.mongoose.Schema

const userSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    login: String,
    senha: String,
})

const User = db.mongoose.model('User', userSchema)

module.exports = User