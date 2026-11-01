const Blog = require('./blog.js')
const User = require('./user.js')
const Author = require('./author.js')
const ReadingList = require('./readingList.js')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersMarked' })

module.exports = {
  Blog,
  User,
  Author,
  ReadingList
}
