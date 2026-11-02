const router = require('express').Router()
const { Blog, User, Session, ReadingList } = require('../models')

router.post('/', async (_req, res) => {
  await Session.destroy({ where: {} })
  await ReadingList.destroy({ where: {} })
  await Blog.destroy({ where: {} })
  await User.destroy({ where: {} })
  res.status(204).end()
})

module.exports = router