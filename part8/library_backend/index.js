/**
 * @file An entry point for Blog List App.
 * @author Roman Vasilyev
 */

const { ApolloServer, gql } = require('apollo-server')
const { v4: uuid } = require('uuid');

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It might make more sense to associate a book with its author by storing the author's id instead of the author's name
 * For simplicity, however, we will store the author's name with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
        genre: String,
        author: String
        ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!,
        genres: [String]
    ): Book
    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
        return books
            .filter(book => args.author 
                ? book.author === args.author
                : book
            )
            .filter(book => args.genre 
                ? book.genres.includes(args.genre)
                : book
            )
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
        return books
            .filter(book => book.author === root.name)
            .length
    }
  },
  Mutation: {
    addBook: (root, args) => {
        // Handle new Author
        if (!authors.find(author => author.name === args.author)) {
            authors.push( {
                name: args.author,
                bord: null,
                id: uuid()
            })
        }

        // Handle new book
        const book = { ...args, id: uuid() }
        books = books.concat(book)
        return book
    },
    editAuthor: (root, args) => {
        if (authors.find(author => author.name === args.name)) {
            authors = authors.map(author => {
                if (author.name === args.name)
                    author.born = args.setBornTo
                return author
            })
    
            return authors.find(author => author.name === args.name)
        }
        else return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})