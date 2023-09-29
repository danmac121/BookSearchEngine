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
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthData
    saveBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
    removeBook(bookId: String!): User
  }
  
  type AuthData {
    token: String!
    user: User!
  }
`