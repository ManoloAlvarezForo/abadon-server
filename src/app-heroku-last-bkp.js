import '@babel/polyfill';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

const http = require('http');

const apollo = new ApolloServer({
  introspection: true,
  playground: true,
  schema,
});

const app = express();
apollo.applyMiddleware({ app });

const server = http.createServer(app);
// Add subscription support
apollo.installSubscriptionHandlers(server);

//Db connection.
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/url');
// Heroku url for Db: mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84
// Local: mongodb://localhost/twall
var promise = mongoose.connect(
  'mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84',
  {
    useNewUrlParser: true,
  }
);

const port = process.env.PORT || 4000;
const hostname = process.env.hostname;
const environment = process.env.NODE_ENV;

promise.then(function(db) {
  server.listen(port, () =>
    console.log(
      `🚀 Teocratic Wall Server (${environment}) environment running at`,
      `http' : ''}://${hostname}:${port}`
    )
  );
});
