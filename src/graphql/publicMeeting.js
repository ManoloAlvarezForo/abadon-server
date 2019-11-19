import * as PublicMeetingResolver from '../resolvers/publicMeeting';

export const PublicMeeting = `
    type PublicMeeting implements EventInterface {
        id: String
        title: String
        date: String
        time: String
        location: String
        description: String
        meetingType: String
        president: String
        speaker: String
        watchtowerGuider: String
        watchtowerReader: String
        type: String
    }

    input PublicMeetingInput {
        title: String
        date: String
        time: String
        location: String
        description: String
        meetingType: String
        president: String
        speaker: String
        watchtowerGuider: String
        watchtowerReader: String
    }
`;

export const PublicMeetingResolvers = {
  Query: {
    publicMeetings: () => {
      return PublicMeetingResolver.getPublicMeetings();
    },
  },
  Mutation: {
    addPublicMeeting: (_, { event }) => {
      return PublicMeetingResolver.addEvent(event);
    },
  },
};
