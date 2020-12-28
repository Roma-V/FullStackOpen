/**
 * @file GraphQL schema for Author
 * @author Roman Vasilyev
 */

/*
 * Imports
 */
const { gql } = require('apollo-server')

/*
 * Apollo scheme
 */
const typeDefs = `
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Mutation {
    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return Book.collection.countDocuments({ author: author._id })
    }
  },
  Mutation: {
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
  }
}