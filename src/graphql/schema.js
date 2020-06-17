import { gql } from "apollo-server";
import { merge } from "lodash";

import { User, UserResolvers } from "./user";
import { Authentication, AuthenticationResolvers } from "./authentication";
import { EventInterface, EventInterfaceResolvers } from "./eventInterface";
import { Preaching, PreachingResolvers } from "./preaching";
import { PublicMeeting, PublicMeetingResolvers } from "./publicMeeting";
import { Event, EventResolvers } from "./event";
import { Notification, NotificationResolvers } from "./notification";
import { Product, ProductResolvers } from "./product";
import { Room, RoomResolvers } from "./room";
import { Client, ClientResolvers } from "./client";

const Query = gql`
  type Query {
    users: [User]
    isValidToken(token: String): ValidToken
    preachings: [Preaching]
    publicMeetings: [PublicMeeting]
    eventById(id: String): Event
    allEvents: [EventOutput]
    getEventsByDate(fromDate: String, toDate: String): [EventOutput]
    getEventsByMonth(month: String, year: String, locale: String): [EventOutput]
    getUnreadNotificationsSize(userId: String): UnreadNotificationsSize
    recentEvents(today: String): [EventOutput]
    products: [Product]
    product(id: String): Product
    productsByFilter(query: String, properties: [String]): [Product]
    productCategories: [ProductCategory]
    comments(productId: String): [Comment]
    rooms: [Room]
    roomById(id: String): Room
    clients: [Client]
    client(id: String): Client
    clientsByFilter(query: String, properties: [String]): [Client]
  }
`;

const Mutation = gql`
  type Mutation {
    signup(email: String, password: String, name: String): AuthPayLoad
    login(email: String, password: String): AuthPayLoad
    addPreachingEvent(event: PreachingInput): Preaching
    addPublicMeeting(event: PublicMeetingInput): PublicMeeting
    sendNotificationByUserId(
      userId: String
      title: String
      text: String
    ): Notification
    addProduct(
      clientId: String
      product: ProductInput
      files: [Upload!]!
    ): Product
    addComment(comment: String, productId: String, userId: String): Comment
    addRoom(room: RoomInput): Room
    addElementToRoom(element: ElementInput, id: String): Element
    client(client: ClientInput, file: Upload!): Client
  }
`;

const Subscription = gql`
  type Subscription {
    newNotificationsAmmount: Int
    notificationSent: Notification
    productAdded: Product
    elementAdded: Element
  }
`;

// const resolvers = {};

export const typeDefs = [
  User,
  Authentication,
  EventInterface,
  Preaching,
  PublicMeeting,
  Event,
  Notification,
  Query,
  Mutation,
  Subscription,
  Product,
  Room,
  Client,
];

export const resolvers = merge(
  resolvers,
  UserResolvers,
  AuthenticationResolvers,
  EventInterfaceResolvers,
  PreachingResolvers,
  PublicMeetingResolvers,
  EventResolvers,
  NotificationResolvers,
  ProductResolvers,
  RoomResolvers,
  ClientResolvers
);

export default {
  typeDefs,
  resolvers,
};
