const database = require('../core/database')
const Schema = database.mongoose.Schema

const userSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: {type: String, unique: true},
    senha: String,
})

const User = database.mongoose.model('User', userSchema)

module.exports = {
    User
}