"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotificationToAll = exports.getUnreadNotificationsSizeByUserId = exports.getUnreadNotificationsByUserId = exports.getUnreadNotifications = exports.sendNotificationByUserId = exports.getNotificationsByUserId = void 0;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Gets the current user notifications by user id.
 *
 * @param {String} userId The String user id.
 */
var getNotificationsByUserId = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var userFound;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findById(id);

          case 2:
            userFound = _context.sent;
            return _context.abrupt("return", userFound.notifications);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getNotificationsByUserId(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {String} targetUserId The String user id.
 * @param {String} text The body text for the notification.
 * @param {String} title The title notification.
 * @param {Object} pubsub Graphql subscrition handler.
 */


exports.getNotificationsByUserId = getNotificationsByUserId;

var sendNotificationByUserId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(targetUserId, text, title, pubsub) {
    var response, userTargetFound, userSaved;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response = null;
            _context2.prev = 1;
            _context2.next = 4;
            return _user["default"].findById(targetUserId);

          case 4:
            userTargetFound = _context2.sent;
            userTargetFound.notifications.unshift({
              text: text,
              title: title
            });
            _context2.next = 8;
            return userTargetFound.save();

          case 8:
            userSaved = _context2.sent;
            response = userSaved.notifications[0]; //Sends notification.

            pubsub.publish('notificationSent', {
              notificationSent: response
            });
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](1);
            console.log("Error to create a notification: [".concat(_context2.t0, "]")); // throw new Error('Error to create a notification');

            return _context2.abrupt("return", null);

          case 17:
            return _context2.abrupt("return", response);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));

  return function sendNotificationByUserId(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Gets the unread notifications basec in a filter.
 *
 * @param {[Object]} notifications Notification list.
 */


exports.sendNotificationByUserId = sendNotificationByUserId;

var getUnreadNotifications = function getUnreadNotifications(notifications) {
  return notifications.filter(function (n) {
    return n.isChecked === false;
  });
};
/**
 * Gets the unread notifications list by a user id.
 *
 * @param {String} userId String User id.
 */


exports.getUnreadNotifications = getUnreadNotifications;

var getUnreadNotificationsByUserId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
    var userFound, notifications;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findById(userId);

          case 2:
            userFound = _context3.sent;
            notifications = getUnreadNotifications(userFound.notifications);
            return _context3.abrupt("return", notifications);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUnreadNotificationsByUserId(_x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Gets the unread user notifications size by user id.
 *
 * @param {String} userId The String user id.
 */


exports.getUnreadNotificationsByUserId = getUnreadNotificationsByUserId;

var getUnreadNotificationsSizeByUserId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId) {
    var notifications;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getUnreadNotificationsByUserId(userId);

          case 2:
            notifications = _context4.sent;
            return _context4.abrupt("return", {
              size: notifications.length
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getUnreadNotificationsSizeByUserId(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Sends a notification to all users.
 *
 * @param {String} text The body text notification.
 * @param {String} title The title notification.
 * @param {Object} pubsub Graphql subscrition handler.
 */


exports.getUnreadNotificationsSizeByUserId = getUnreadNotificationsSizeByUserId;

var sendNotificationToAll = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(text, title, pubsub) {
    var usersToAddNotification;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _user["default"].find({});

          case 3:
            usersToAddNotification = _context6.sent;
            usersToAddNotification.map( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return sendNotificationByUserId(user.id, title, text, pubsub);

                      case 2:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x11) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", null);

          case 10:
            return _context6.abrupt("return", true);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function sendNotificationToAll(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.sendNotificationToAll = sendNotificationToAll;