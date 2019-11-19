import * as PrechingResolver from '../resolvers/preaching';
import * as NotificationResolvers from '../resolvers/notifications';
import { pubsub } from '../app';
export const Preaching = `
    type Preaching implements EventInterface {
        id: String
        lead: String
        territories: [String]
        title: String
        date: String
        time: String
        location: String
        description: String
        moment: String
        type: String
    }

    input PreachingInput {
        lead: String
        territories: [String]
        title: String
        date: String
        time: String
        location: String
        description: String
        moment: String
    }
`;

export const PreachingResolvers = {
  Query: {
    preachings: () => {
      return PrechingResolver.getPreachings();
    },
  },
  Mutation: {
    addPreachingEvent: async (_, { event }, context) => {
      const currentUser = await context.user;
      if (!currentUser) {
        throw new Error('You are not Authenticated!');
      }
      const response = await PrechingResolver.addEvent(event);

      await NotificationResolvers.sendNotificationToAll(
        'New Preaching event was created',
        'A new preaching event was created please review your calendar events in the Events option.',
        pubsub
      );

      return response;
    },
  },
};
