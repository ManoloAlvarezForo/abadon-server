import "@babel/polyfill";
import express from "express";
import mongoose from "mongoose";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/schema";

// Subscriptions
import { PubSub } from "graphql-subscriptions";
// import fs from 'fs';
// import { createServer as createServerHttps } from 'https';
import { createServer } from "http";
import { getUserAuthenticated } from "./utils/authentication";
export const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      const token = req.headers.authorization || "";
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

      throw new Error("You are not Authenticated!");
    },
  },
});

existsSync(path.join(__dirname, "../images")) ||
  mkdirSync(path.join(__dirname, "../images"));

// existsSync(path.join(__dirname, "../images/products")) ||
//   mkdirSync(path.join(__dirname, "../images/products"));

// existsSync(path.join(__dirname, "../images/products/thumbnails")) ||
//   mkdirSync(path.join(__dirname, "../images/products/thumbnails"));

// existsSync(path.join(__dirname, "../images/brands")) ||
//   mkdirSync(path.join(__dirname, "../images/brands"));

// existsSync(path.join(__dirname, "../images/brands/thumbnails")) ||
//   mkdirSync(path.join(__dirname, "../images/brands/thumbnails"));

const app = express();

app.use("/images", express.static(path.join(__dirname, "../images")));
// app.use(
//   "/images/brands",
//   express.static(path.join(__dirname, "../images/brands"))
// );

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
var mongoPromise = mongoose.connect("mongodb://localhost/abadon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const port = process.env.PORT || 4000;
// const hostname = process.env.hostname;
const environment = process.env.NODE_ENV || "development";

mongoPromise.then(() => {
  server.listen(port, () =>
    console.log(
      `🚀 Abadon Server [${environment}] environment running at port:${port}`
    )
  );
});
