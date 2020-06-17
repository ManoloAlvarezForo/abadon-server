import * as RoomResolver from "../resolvers/room";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../app";
import { gql } from "apollo-server";

export const Room = gql`
  type Board {
    objects: [Element]
  }

  input BoardInput {
    objects: [ElementInput]
  }

  type Element {
    id: String
    elementId: String
    angle: Int
    backgroundColor: String
    fill: String
    fillRule: String
    flipX: Boolean
    flipY: Boolean
    globalCompositeOperation: String
    height: Int
    left: Int
    opacity: Int
    originX: String
    originY: String
    paintFirst: String
    rx: Int
    ry: Int
    scaleX: Int
    scaleY: Int
    skewX: Int
    skewY: Int
    strokeDashArray: [Int]
    strokeDashOffset: Int
    strokeLineCap: String
    strokeLineJoin: String
    strokeMiterLimit: Int
    strokeWidth: Int
    top: Int
    transformMatrix: [Int]
    type: String
    visible: Boolean
    width: Int
  }

  input ElementInput {
    fill: String
    left: Int
    top: Int
    height: Int
    width: Int
    type: String
  }

  type Room {
    id: String
    roomName: String
    roomId: String
    board: Board
    createdDate: String
  }

  input RoomInput {
    roomName: String
    board: BoardInput
  }
`;

export const RoomResolvers = {
  Subscription: {
    elementAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("elementAdded"),
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
    rooms: () => {
      // validateAuthentication(context.user);
      return RoomResolver.getRooms();
    },
    roomById: (_, { id }) => {
      return RoomResolver.getRoomById(id);
    },
  },
  Mutation: {
    addRoom: (_, { room }) => {
      return RoomResolver.addRoom(room);
    },
    addElementToRoom: (_, { id, element }) => {
      return RoomResolver.addElement(id, element);
    },
  },
};
