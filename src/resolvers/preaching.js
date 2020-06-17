import Preaching from '../models/preaching';

/**
 * Gets all Preaching events.
 */
export const getPreachings = async () => {
  return await Preaching.find({});
};

/**
 * Adds the new Preaching events by args.
 *
 * @param {Object} args Object with all properties for a Preaching event.
 */
export const addEvent = async args => {
  const newPreaching = new Preaching({ ...args });
  const response = await newPreaching.save();
  return response;
};

/**
 * Gets a Preaching event by Preaching id.
 *
 * @param {String} id String Preaching id.
 */
export const getPreachingById = async id => {
  return await Preaching.findById(id);
};
