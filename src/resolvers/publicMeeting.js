import PublicMeeting from '../models/publicMeeting';
export const getPublicMeetings = async () => {
  return await PublicMeeting.find({});
};

export const addEvent = async args => {
  const newPublicMeeting = new PublicMeeting({ ...args });
  const response = await newPublicMeeting.save();
  return response;
};

export const getPublicMeetingById = async id => {
  return await PublicMeeting.findById(id);
};
