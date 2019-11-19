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

const apolloServer = new ApolloServer({
  introspection: true,
  playground: true,
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
    }
  }
});

const app = express();
apolloServer.applyMiddleware({ app });

const server = createServer(app);

// Add subscription support
apolloServer.installSubscriptionHandlers(server);

//Db connection.
mongoose.Promise = global.Promise;

// Heroku Database configuration.
// var promise = mongoose.connect(
//   'mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84',
//   {
//     useNewUrlParser: true,
//   }
// );

// Local Database configuration.
var mongoPromise = mongoose.connect('mongodb://localhost/abadon', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 4000;
// const hostname = process.env.hostname;
const environment = process.env.NODE_ENV;

mongoPromise.then(() => {
  server.listen(port, () =>
    console.log(
      `🚀 Abadon Server [${environment}] environment running at port:${port}`
    )
  );
});
