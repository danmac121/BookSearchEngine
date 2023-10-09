const typeDefs = `
type Book{
    id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}
type User {
    id: ID!
    username: String!
    email: String!
    password: String! 
    savedBooks: [Book]
    bookCount: Int!
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
    deleteBook(bookId: String!): User
  }
  
  type Auth {
    token: ID!
    user: User
  }
`
module.exports = typeDefs;