import { gql } from "apollo-server";
import { merge } from "lodash";

import { User, UserResolvers } from "./user";
import { Authentication, AuthenticationResolvers } from "./authentication";
import { EventInterface } from "./eventInterface";
import { Preaching, PreachingResolvers } from "./preaching";
import { PublicMeeting, PublicMeetingResolvers } from "./publicMeeting";
import { Event, EventResolvers } from "./event";
import { Notification, NotificationResolvers } from "./notification";
import { Product, ProductResolvers } from "./product";
import { Room, RoomResolvers } from "./room";

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
    productsByFilter(query: String, properties: [String]): [Product]
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
    addProduct(product: ProductInput, file: Upload!): Product
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
];

export const resolvers = merge(
  resolvers,
  UserResolvers,
  AuthenticationResolvers,
  PreachingResolvers,
  PublicMeetingResolvers,
  EventResolvers,
  NotificationResolvers,
  ProductResolvers,
  RoomResolvers
);

// export default makeExecutableSchema({
//   typeDefs: [
//     User,
//     Authentication,
//     EventInterface,
//     Preaching,
//     PublicMeeting,
//     Event,
//     Notification,
//     Query,
//     Mutation,
//     Subscription,
//     Product,
//     Room,
//   ],
//   resolvers: merge(
//     resolvers,
//     UserResolvers,
//     AuthenticationResolvers,
//     PreachingResolvers,
//     PublicMeetingResolvers,
//     EventResolvers,
//     NotificationResolvers,
//     ProductResolvers,
//     RoomResolvers
//   ),
//   resolverValidationOptions: { requireResolversForResolveType: false },
// });

export default {
  typeDefs,
  resolvers,
};
