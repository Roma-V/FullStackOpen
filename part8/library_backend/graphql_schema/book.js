/**
 * @file GraphQL schema for Book
 * @author Roman Vasilyev
 */

/*
 * Imports
 */
const { gql, UserInputError } = require('apollo-server')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

/*
 * Apollo scheme
 */
const typeDefs = `
type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}

extend type Query {
  bookCount: Int!
  allBooks(
      genre: String,
      author: String
      ): [Book!]!
}

extend type Mutation {
  addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
  ): Book
}

extend type Subscription {
  bookAdded: Book!
}    
`

const resolvers = {
    Query: {
    bookCount: () => Book.collection.countDocuments(),
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
    },
    Mutation: {
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
    },

    Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
    },
}