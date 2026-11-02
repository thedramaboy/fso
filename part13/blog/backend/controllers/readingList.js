const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')
const { tokenExtractor, blogFinder } = require('../utils/middleware')

router.post('/', async (req, res) => {

  const { blogId, userId } = req.body

  if (!blogId || !userId) {
    return res.status(400).json({ error: "user or blog not found"})
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  const blog = await Blog.findByPk(blogId)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  const lists = await ReadingList.create({ blogId, userId })
  res.json(lists)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  if (typeof req.body.read !== 'boolean') {
    return res.status(400).json({ error: "Request should be \"read\": bool"})
  }
  const readList = await ReadingList.findByPk(req.params.id)

  if (!readList) {
    return res.status(404).json({ error: 'read list not found'})
  }

  if (readList.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: 'user can only mark their own'})
  }

  readList.read = req.body.read;
  await readList.save();
  res.json(readList)
})

module.exports = router