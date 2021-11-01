const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const mongoose = require('mongoose');

async function startServer(uri, callback) {
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

    await mongoose.connect(`mongodb://a:a@localhost/test?authSource=admin`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (d) => {
        d ? console.log('callback error', d) : '';
    });

    app.listen(4000, () => console.log('Server running on port 4000'));
}

startServer();