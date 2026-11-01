const jwt = require("jsonwebtoken");
const { SECRET } = require('../utils/config');

const errorHandler = (error, _req, res, next) => {

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }  else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  } else if (error.name === 'SequelizeValidationError' ||
           error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: error.errors.map((e) => e.message)
    })
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'invalid userId or blogId: referenced record does not exist' })
  }

  next(error);
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  next();
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing '});
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  blogFinder
};
