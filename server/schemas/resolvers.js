const {Book, User} = require('../models');
const {signToken} = require('../utils/auth');
const resolvers = {
    Query: {
      me: async (_, __, context) => {
        if (context.user) {
          const foundUser = await User.findOne({
            _id: context.user._id
          });
          if (!foundUser) {
            throw new Error('Cannot find a user with this id!');
          }
          return foundUser;
        }
        throw new Error('Not authenticated');
      }
    },

    Mutation: {
        createUser: async (_, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          if (!user) {
            throw new Error('Something is wrong!');
          }
          const token = signToken(user);
          return { token, user };
        },
        login: async (_, { username, email, password }) => {
          const user = await User.findOne({ $or: [{ username }, { email }] });
          if (!user) {
            throw new Error("Can't find this user");
          }
          const correctPw = await user.isCorrectPassword(password);
          if (!correctPw) {
            throw new Error('Wrong password!');
          }
          const token = signToken(user);
          return { token, user };
        },
        saveBook: async (_, args, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: args.input } },  
              { new: true, runValidators: true }
            );
            if (!updatedUser) {
              throw new Error('Error saving the book');
            }
            return updatedUser;
          }
          throw new Error('Not authenticated');
        },
        deleteBook: async (_, { bookId }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
            if (!updatedUser) {
              throw new Error("Couldn't find user with this id!");
            }
            return updatedUser;
          }
          throw new Error('Not authenticated');
        }
      }
}
module.exports = resolvers;