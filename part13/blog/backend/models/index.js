const Blog = require('./blog.js')
const User = require('./user.js')
const Author = require('./author.js')

User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
  Blog,
  User,
  Author,
}
