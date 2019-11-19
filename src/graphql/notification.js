import * as NotificationsResolver from '../resolvers/notifications';
import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../app';

export const Notification = `
  type Notification {
    title: String
    text: String
    createdDate: String
    id: String
    isChecked: Boolean
  }

  type UnreadNotificationsSize {
    size: Int
  }
`;

export const NotificationResolvers = {
  Subscription: {
    notificationSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('notificationSent'),
        (payload, variables, context) => {
          const user = context.user;
          // The payload in that case is the new preaching and the variables comes from the params.
          // return payload.commentAdded.repository_name === variables.repoFullName;
          return true;
        }
      ),
    },
  },
  Query: {
    getUnreadNotificationsSize: async (_, { userId }) => {
      return NotificationsResolver.getUnreadNotificationsSizeByUserId(userId);
    },
  },
  Mutation: {
    sendNotificationByUserId: async (_, { userId, title, text }) => {
      const notification = await NotificationsResolver.sendNotificationByUserId(
        userId,
        title,
        text
      );

      return notification;
    },
  },
};
