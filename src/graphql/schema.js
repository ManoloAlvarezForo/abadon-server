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
import { Category, CategoryResolvers } from "./category";

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
    clients: [Client]
    client(id: String): Client
    clientsByFilter(query: String, properties: [String]): [Client]
    categories: [Category]
    category(id: String): Category
    comments(productId: String): [Comment]
    rooms: [Room]
    roomById(id: String): Room
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
    product(
      clientId: String
      type: String
      categories: [String]
      product: ProductInput
      files: [Upload!]!
    ): Product
    client(client: ClientInput, file: Upload!): Client
    category(category: CategoryInput, file: Upload!): Category
    comment(comment: String, productId: String, userId: String): Comment
    addRoom(room: RoomInput): Room
    addElementToRoom(element: ElementInput, id: String): Element
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
  Category,
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
  ClientResolvers,
  CategoryResolvers
);

export default {
  typeDefs,
  resolvers,
};
