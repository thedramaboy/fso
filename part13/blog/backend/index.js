const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/author')
const resetRouter = require('./controllers/reset')
const readingListRouter = require('./controllers/readingList')
const { errorHandler } = require('./utils/middleware')

app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).send('ok')
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/reset', resetRouter)
app.use('/api/readinglists', readingListRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()