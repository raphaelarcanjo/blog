const port = process.env.PORT || 3000
const dbname = 'blog'
const dburl = 'mongodb://localhost:27017/'

module.exports = {
    port,
    dbname,
    dburl
}