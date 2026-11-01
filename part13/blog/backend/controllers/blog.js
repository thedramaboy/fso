const router = require('express').Router()
const { User, Blog } = require('../models')
const { tokenExtractor, blogFinder } = require('../utils/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title:  { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: 'userId'},
    include: { model: User, attributes: ['name']},
    where,
    order: [['likes', 'desc']]
  })
  res.json(blogs);
})

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog);
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    if (req.blog.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'only the creator can delete this blog' })
    }
    await req.blog.destroy()
    res.status(204).end()
})

module.exports = router