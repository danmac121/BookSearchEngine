const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const contextMiddleware = ({ req }) => {
    // pulling the token from the request
    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    let user = null;

    // if there's a token, try to decode it
    if (token) {
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            user = data;
        } catch {
            console.log('Invalid token');
        }
    }

    // return an object that will be passed to all resolvers
    return { user };
};

//  Apollo Server setup code 

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextMiddleware
});