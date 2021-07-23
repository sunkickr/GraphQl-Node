const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutations')
const User = require('./resolvers/Users')
const Link = require('./resolvers/Link')

const resolvers = {
    Query,
    Mutation,
    User,
    Link
}

const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        };
    }
});

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );