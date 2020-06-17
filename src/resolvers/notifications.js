import User from '../models/user';

/**
 * Gets the current user notifications by user id.
 *
 * @param {String} userId The String user id.
 */
export const getNotificationsByUserId = async userId => {
  const userFound = await User.findById(id);
  return userFound.notifications;
};

/**
 *
 * @param {String} targetUserId The String user id.
 * @param {String} text The body text for the notification.
 * @param {String} title The title notification.
 * @param {Object} pubsub Graphql subscrition handler.
 */
export const sendNotificationByUserId = async (
  targetUserId,
  text,
  title,
  pubsub
) => {
  let response = null;

  try {
    const userTargetFound = await User.findById(targetUserId);
    userTargetFound.notifications.unshift({ text, title });
    const userSaved = await userTargetFound.save();
    response = userSaved.notifications[0];
    //Sends notification.
    pubsub.publish('notificationSent', {
      notificationSent: response,
    });
  } catch (error) {
    console.log(`Error to create a notification: [${error}]`);
    // throw new Error('Error to create a notification');
    return null;
  }

  return response;
};

/**
 * Gets the unread notifications basec in a filter.
 *
 * @param {[Object]} notifications Notification list.
 */
export const getUnreadNotifications = notifications => {
  return notifications.filter(n => n.isChecked === false);
};

/**
 * Gets the unread notifications list by a user id.
 *
 * @param {String} userId String User id.
 */
export const getUnreadNotificationsByUserId = async userId => {
  const userFound = await User.findById(userId);
  const notifications = getUnreadNotifications(userFound.notifications);

  return notifications;
};

/**
 * Gets the unread user notifications size by user id.
 *
 * @param {String} userId The String user id.
 */
export const getUnreadNotificationsSizeByUserId = async userId => {
  const notifications = await getUnreadNotificationsByUserId(userId);
  return {
    size: notifications.length,
  };
};

/**
 * Sends a notification to all users.
 *
 * @param {String} text The body text notification.
 * @param {String} title The title notification.
 * @param {Object} pubsub Graphql subscrition handler.
 */
export const sendNotificationToAll = async (text, title, pubsub) => {
  try {
    const usersToAddNotification = await User.find({});

    usersToAddNotification.map(async user => {
      await sendNotificationByUserId(user.id, title, text, pubsub);
    });
  } catch (error) {
    return null;
  }

  return true;
};
