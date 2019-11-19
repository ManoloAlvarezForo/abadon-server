import '@babel/polyfill';
import express from 'express';
import mongoose from 'mongoose';
// import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

// Subscriptions
import { PubSub } from 'graphql-subscriptions';
// import fs from 'fs';
// import { createServer as createServerHttps } from 'https';
import { createServer } from 'http';
import { getUserAuthenticated } from './utils/authentication';
export const pubsub = new PubSub();

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 8443, hostname: 'localhost' },
  development: { ssl: false, port: 4000, hostname: 'localhost' },
};

const environment = process.env.NODE_ENV || 'development';
const config = configurations[environment];

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      const token = req.headers.authorization || '';
      const user = await getUserAuthenticated(token);
      return { user };
    }
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      if (connectionParams.authorization) {
        const token = connectionParams.authorization;
        const user = await getUserAuthenticated(token);

        return { user };
      }

      throw new Error('You are not Authenticated!');
    },
  },
});

const app = express();
apolloServer.applyMiddleware({ app });

const server = createServer(app);

// Add subscription support
apolloServer.installSubscriptionHandlers(server);

//Db connection.
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/url');
// Heroku url for Db: mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84
// Local: mongodb://localhost/twall
var promise = mongoose.connect('mongodb://localhost/twall', {
  useNewUrlParser: true,
});

const port = process.env.PORT || 4000;
promise.then(function(db) {
  server.listen(config.port, () =>
    console.log(
      `🚀 Theocratic Wall Server [${environment}] is running at http${
        config.ssl ? 's' : ''
      }://${config.hostname}:${config.port}${apolloServer.graphqlPath}`
    )
  );
});
