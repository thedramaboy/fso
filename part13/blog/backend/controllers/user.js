const { User, Blog, ReadingList } = require('../models');

const router = require('express').Router();

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ['userId']} }
  })
  res.json(users);
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { 
          exclude: ['userId', 'createdAt', 'updatedAt'] 
        },
        through: { 
          attributes: ['id', 'read'],
          where
        }
      }
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: "User not found" })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username }})
  if (user) {
    user.name = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found'})
  }
})

module.exports = router