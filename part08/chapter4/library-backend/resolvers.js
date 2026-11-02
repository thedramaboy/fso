const { GraphQLError } = require('graphql/error')
const Author = require('./models/author')
const Book = require('./models/book')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      if (!args.genre) return Book.find({}).populate('author')
      return Book.find({ genres: {$in : [args.genre]} }).populate('author')
    },
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: (root) => {
      return Book.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError ('Not authenticated', {
          extensions: { code: "UNAUTHENTICATED"}
        })
      }

      let author = await Author.findOne({ name: args.author})

      if (!author) {
        author = new Author({ name: args.author})
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError (error.message, {
            extensions: { code: "BAD_USER_INPUT"}
          })
        }
      }

      const book = new Book({ ...args, author: author._id})
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError (error.message, {
          extensions: {code: "BAD_USER_INPUT"}
        })
      }

      return book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError ('Not authenticated', {
          extensions: { code: "UNAUTHENTICATED"}
        })
      }
      const author = await Author.findOne({name: args.name})
      if(!author) return null

      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT"}
        })
      }
    },
    addAuthor: async (root, args) => {
      let author = await Author.findOne({name: args.name})

      if(author) {
        return author
      }

      author = new Author({ name: args.name, born: args.born})
      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT"}
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "USER_BAD_INPUT"}
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {code: "BAD_USER_INPUT"}
        })
      }
      try {
const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT"}
        })
      }
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },
  }
}

module.exports = resolvers