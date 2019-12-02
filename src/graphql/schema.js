import { merge } from 'lodash';
import { User, UserResolvers } from './user';
import { Authentication, AuthenticationResolvers } from './authentication';
import { EventInterface } from './eventInterface';
import { Preaching, PreachingResolvers } from './preaching';
import { PublicMeeting, PublicMeetingResolvers } from './publicMeeting';
import { Event, EventResolvers } from './event';
import { Notification, NotificationResolvers } from './notification';
import { Product, ProductResolvers } from './product';
import { makeExecutableSchema } from 'graphql-tools';

const Query = `
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
    }
`;

const Mutation = `
    type Mutation {
        signup(email: String, password: String, name: String): AuthPayLoad
        login(email: String, password: String): AuthPayLoad
        addPreachingEvent(event: PreachingInput): Preaching
        addPublicMeeting(event: PublicMeetingInput): PublicMeeting
        sendNotificationByUserId(userId: String, title: String, text: String): Notification
        addProduct(product: ProductInput): Product 
    }
`;

const Subscription = `
    type Subscription {
      newNotificationsAmmount: Int
      notificationSent: Notification
    }
`;

const resolvers = {};

export default makeExecutableSchema({
  typeDefs: [
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
    Product
  ],
  resolvers: merge(
    resolvers,
    UserResolvers,
    AuthenticationResolvers,
    PreachingResolvers,
    PublicMeetingResolvers,
    EventResolvers,
    NotificationResolvers,
    ProductResolvers
  ),
  resolverValidationOptions: { requireResolversForResolveType: false }
});
