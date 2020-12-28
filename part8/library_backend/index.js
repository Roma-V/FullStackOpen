/**
 * @file An entry point for Library App.
 * @author Roman Vasilyev
 */

/*
 * Imports
 */
const config = require('./utils/config.js')
const jwt = require('jsonwebtoken')

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { PubSub } = require('apollo-server')

const mongoose = require('mongoose')
const User = require('./models/user.js')
const Book = require('./models/book.js')
const Author = require('./models/author.js')

/*
 * DB connection
 */
console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(result => {
    console.log('Connected to DB', result.connections[0].name)
  })
  .catch(error => {
    console.error('connection to DB failed', error.message)
  })

/*
 * Apollo scheme
 */
const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(
        genre: String,
        author: String
        ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]
    ): Book

    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author
  }

  type Subscription {
    bookAdded: Book!
  }    
`

const pubsub = new PubSub()
const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // Create a query with optional parameters
      let query = {}
      // @author
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) 
          throw new UserInputError("Author not found", {
            invalidArgs: args.author,
          })

        query.author = author._id
      }
      // @genre
      if (args.genre) query.genres = { $in: [ args.genre ] }
      
      // Search the book
      return Book
        .find(query)
        .populate('author', Author)
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return Book.collection.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user
        .save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'logmein') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.LOGIN_TOKENIZER) }
    },

    addBook: async (root, args, context) => {
      // Hondle login
      if (!context.currentUser) return

      // Handle new Author
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        newAuthor = new Author({
          name: args.author,
          born: null
        })

        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      // Handle new book
      const book = new Book({...args, author})
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      // Hondle login
      if (!context.currentUser) return

      // Find the author
      const author = await Author.findOne({ name: args.name })
      if (!author) return

      // Edit
      author.born = args.setBornTo
      return author.save()
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

/*
 * The server
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.LOGIN_TOKENIZER
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscription ready at ${subscriptionsUrl}`)
})