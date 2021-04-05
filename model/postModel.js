const db = require('../core/database')
const Schema = db.mongoose.Schema

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

const Post = db.mongoose.model('Post', postSchema)

module.exports = Post