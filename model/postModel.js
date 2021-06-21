const database = require('../core/database')
const Schema = database.mongoose.Schema

const postSchema = new Schema({
    usuario: String,
    posts: {
        post: String,
        type: String,
        public: Boolean
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Post = database.mongoose.model('Post', postSchema)

module.exports = {
    Post
}