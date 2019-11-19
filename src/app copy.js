import '@babel/polyfill';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

// Subscriptions
import { PubSub } from 'graphql-subscriptions';
import fs from 'fs';
import { createServer as createServerHttps } from 'https';
import { createServer } from 'http';
import { getUserByToken } from './resolvers/authentication';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
export const pubsub = new PubSub();

// const WS_PORT = 5000;

// // Create WebSocket listener server
// const websocketServer = createServer((request, response) => {
//   response.writeHead(404);
//   response.end();
// });

// // Bind it to port and start listening
// websocketServer.listen(WS_PORT, () =>
//   console.log(
//     `🚀 Theocratic Wall Websocket Server is now running on http://localhost:${WS_PORT}`
//   )
// );

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 8443, hostname: 'localhost' },
  development: { ssl: false, port: 4000, hostname: 'localhost' },
};

const environment = process.env.NODE_ENV || 'development';
const config = configurations[environment];

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const user = await getUserByToken(token);

    // add the user to the context
    return { user };
  },
  subscriptions: async (connectionParams, webSocket) => {
    if (connectionParams.authToken) {
      const user = await getUserByToken(connectionParams.authToken);

      return { user };
    }

    throw new Error('Missing auth token!');
  },
});

const app = express();
// apolloServer.applyMiddleware({ app });

// Create the HTTPS or HTTP server, per configuration
//Fixed to load cert and key files using path and __dirname
const keyPath = path.join(__dirname, './ssl_files/noox-key.pem');
const key = fs.readFileSync(keyPath);

const certPath = path.join(__dirname, './ssl_files/noox-cert.pem');
const cert = fs.readFileSync(certPath);

let server;

if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = createServerHttps(
    {
      key: key,
      cert: cert,
    },
    app
  );
} else {
  server = createServer(app);
}

// Add subscription support
// apolloServer.installSubscriptionHandlers(server);

// const subscriptionServer = new SubscriptionServer(
//   {
//     schema,
//     execute,
//     subscribe,
//   },
//   {
//     server,
//     path: '/graphql',
//   }
// );

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
  server.listen(config.port, () => {
    console.log(
      `🚀 Theocratic Wall Server [${environment}] is running at http${
        config.ssl ? 's' : ''
      }://${config.hostname}:${config.port}${apolloServer.graphqlPath}`
    );
    new SubscriptionServer(
      {
        schema,
        execute,
        subscribe,
      },
      {
        server,
        path: '/graphql',
      }
    );
  });
});
