import Room from "../models/room";
import { pubsub } from "../app";

export const getRooms = async () => {
  return await Room.find({});
};

export const addRoom = async (args) => {
  const newRoom = new Room({ ...args });
  const response = await newRoom.save();
  return response;
};

export const getRoomById = async (id) => {
  return await Room.findById(id);
};

export const addElement = async (roomId, element) => {
  let foundRoom = await getRoomById(roomId);

  if (!foundRoom) {
    throw Error(`Room not found.`);
  }

  foundRoom.board.objects.push({ ...element });
  const savedRoom = await foundRoom.save();
  console.log(`[INFO]: element saved. in Room ["${savedRoom.roomName}"]`);
  // TODO: improve find the last entry implementation,
  // suggestion search in mongoose model with collection properties instead pop.
  const {
    board: { objects },
  } = savedRoom;
  const elementLastAdded = objects.pop();

  pubsub.publish("elementAdded", {
    elementAdded: elementLastAdded,
  });

  return elementLastAdded;
};
