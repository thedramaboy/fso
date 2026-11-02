const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { User, Session } = require('../models')
const { SECRET } = require('../utils/config')

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } })
  
  // const passwordCorrect =
  //   password === 'secret' ? true : false;

  // if (!(user && passwordCorrect)) {
  //   return res.status(401).json({
  //     error: "invalid username or password",
  //   });
  // }

  if (!user) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  if (user.disabled) {
    return res.status(403).json({ error: 'your username was disabled'})
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({ userId: user.id, token })  

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = router