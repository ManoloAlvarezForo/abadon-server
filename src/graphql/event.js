import * as EventResolver from "../resolvers/event";
import { gql } from "apollo-server";

export const Event = gql`
  union Events = Preaching | PublicMeeting
  union Event = Preaching | PublicMeeting

  type EventOutput {
    date: String
    events: [Events]
  }
`;

export const EventResolvers = {
  Query: {
    allEvents: () => {
      return EventResolver.getEvents();
    },
    getEventsByDate: (_, { fromDate, toDate }) => {
      return EventResolver.getEventsByDate(fromDate, toDate);
    },
    getEventsByMonth: (_, { month, year, locale }) => {
      return EventResolver.getEventsByMonth(month, year, locale);
    },
    eventById: (_, { id }) => {
      return EventResolver.getEventById(id);
    },
    recentEvents: (_, { today }) => {
      return EventResolver.getRecentEvents(today);
    },
  },
  Event: {
    __resolveType(obj) {
      if (obj.kind === "preaching") {
        return "Preaching";
      }

      if (obj.kind === "publicMeeting") {
        return "PublicMeeting";
      }

      return null;
    },
  },
  Events: {
    __resolveType(obj) {
      if (obj.kind === "preaching") {
        return "Preaching";
      }

      if (obj.kind === "publicMeeting") {
        return "PublicMeeting";
      }

      return null;
    },
  },
};
