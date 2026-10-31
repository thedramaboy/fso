const Note = require('./note')
const User = require('./user')

Note.belongsTo(User)
User.hasMany(Note)

// const syncModels = async () => {
//   User.sync({ alter: true })
//   Note.sync({ alter: true })
// }

// syncModels()

module.exports = {
  Note, User
}