const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const mongoose = require('mongoose');

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    // Specifying path for GraphQl playground
    // apolloServer.applyMiddleware({app: app, path: 'truly'});
    apolloServer.applyMiddleware({app: app});

    app.use((req, res) => {
        res.send("Hello from Apollo Server");
    })

    await mongoose.connect('mongodb://localhost:27017/post_db', {
       useUnifiedTopology: true,
       useNewUrlParser: true
    });

    console.log('Mongoose connected');

    app.listen(4000, () => console.log('Server running on port 4000'));
}

startServer();