"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comments = exports.addComment = exports.getProductCategories = exports.getProductsByCategory = exports.getProductsByFilter = exports.getProductById = exports.addProduct = exports.getProducts = void 0;

var _product = _interopRequireDefault(require("../models/product"));

var _user = require("../resolvers/user");

var _client = require("../resolvers/client");

var _category = require("./category");

var _thumbnail = require("../resolvers/thumbnail");

var _fileManager = require("../utils/fileManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getProducts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _product["default"].find({}).populate("thumbs").populate("client").populate({
              path: "client",
              populate: "thumb"
            }).populate("type").populate("categories");

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProducts() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Adds a new product in the product collection.
 *
 * @param {object} product Product to add.
 * @param {object} pubsub for Subscriptions.
 */


exports.getProducts = getProducts;

var addProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(clientId, type, categories, product, files) {
    var newProduct, thumbs, thumbnailsSaved, productSaved, foundClient, foundType, categoriesResponse;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newProduct = new _product["default"](_objectSpread({}, product));
            _context2.next = 4;
            return (0, _fileManager.uploadFiles)(files);

          case 4:
            thumbs = _context2.sent;

            if (thumbs) {
              _context2.next = 7;
              break;
            }

            throw Error("[Error]: to upload file.");

          case 7:
            _context2.next = 9;
            return (0, _thumbnail.addThumbnails)(thumbs);

          case 9:
            thumbnailsSaved = _context2.sent;
            newProduct.thumbs = thumbnailsSaved;
            productSaved = {};
            console.log("[INFO]: product added succsessfully.");

            if (!clientId) {
              _context2.next = 19;
              break;
            }

            _context2.next = 16;
            return (0, _client.getClientById)(clientId);

          case 16:
            foundClient = _context2.sent;
            newProduct.client = foundClient._id; // productSaved = await newProduct.save();
            // foundClient.products.unshift(productSaved._id);
            // await foundClient.save();

            console.log("[INFO]: product added to a client succsessfully.");

          case 19:
            if (!type) {
              _context2.next = 25;
              break;
            }

            console.log("Category ID: ", type);
            _context2.next = 23;
            return (0, _category.getCategoryById)(type);

          case 23:
            foundType = _context2.sent;
            newProduct.type = foundType._id;

          case 25:
            console.log(categories);
            _context2.next = 28;
            return (0, _category.createCategories)(categories);

          case 28:
            categoriesResponse = _context2.sent;

            if (categoriesResponse) {
              newProduct.categories = [].concat(_toConsumableArray(newProduct.categories), [categoriesResponse]);
            }

            _context2.next = 32;
            return newProduct.save();

          case 32:
            productSaved = _context2.sent;
            console.log(productSaved); // const productPopulated = await getProductById(productSaved.id);

            return _context2.abrupt("return", productSaved);

          case 37:
            _context2.prev = 37;
            _context2.t0 = _context2["catch"](0);
            console.log("[Error]: Error to save a product. ", _context2.t0);

          case 40:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 37]]);
  }));

  return function addProduct(_x, _x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Gets a Product model by ID.
 *
 * @param {string} id String that represents an ID.
 */


exports.addProduct = addProduct;

var getProductById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var foundProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _product["default"].findById(id).populate("thumbs").populate("client").populate("type").populate("categories").populate({
              path: "client",
              populate: "thumb"
            });

          case 2:
            foundProduct = _context3.sent;
            return _context3.abrupt("return", foundProduct);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProductById(_x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Gets an product array by filter and properties.
 *
 * @param {string} query String that represents a Query.
 * @param {string[]} properties Array of string that represent properties.
 */


exports.getProductById = getProductById;

var getProductsByFilter = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var properties,
        regexToMatch,
        propertiesToMatch,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            properties = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : [];
            regexToMatch = {
              $regex: new RegExp(query, "ig")
            };
            propertiesToMatch = properties.map(function (property) {
              return _defineProperty({}, property, regexToMatch);
            });

            if (!(query && properties.length > 0)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 6;
            return _product["default"].aggregate([{
              $match: {
                $or: propertiesToMatch
              }
            }, {
              $addFields: {
                id: {
                  $toString: "$_id"
                }
              }
            }]);

          case 6:
            return _context4.abrupt("return", _context4.sent);

          case 9:
            _context4.next = 11;
            return _product["default"].find({});

          case 11:
            return _context4.abrupt("return", _context4.sent);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getProductsByFilter(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getProductsByFilter = getProductsByFilter;

var getProductsByCategory = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(category) {
    var response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _product["default"].aggregate([{
              $match: {
                categories: category
              }
            }, {
              $addFields: {
                id: {
                  $toString: "$_id"
                }
              }
            }]);

          case 2:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getProductsByCategory(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Gets the enum values from product categories.
 */


exports.getProductsByCategory = getProductsByCategory;

var getProductCategories = function getProductCategories() {
  var categories = _product["default"].schema.path("categories").caster.enumValues;

  var response = categories.map(function (category) {
    return {
      name: category
    };
  });
  return response;
};
/**
 * Adds a comment according product id and user id.
 *
 * @param {string} comment String that represents a comment.
 * @param {string} productId String that represents a product id.
 * @param {string} userId String that represents a user id.
 */


exports.getProductCategories = getProductCategories;

var addComment = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(comment, productId, userId) {
    var foundProduct, _yield$getUserById, name, productSaved;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return getProductById(productId);

          case 3:
            foundProduct = _context6.sent;
            _context6.next = 6;
            return (0, _user.getUserById)(userId);

          case 6:
            _yield$getUserById = _context6.sent;
            name = _yield$getUserById.name;
            foundProduct.comments.unshift({
              comment: comment,
              user: name,
              userId: userId
            });
            _context6.next = 11;
            return foundProduct.save();

          case 11:
            productSaved = _context6.sent;
            return _context6.abrupt("return", productSaved.comments[0]);

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](0);
            throw Error("[ERROR]: Error to add a comment");

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 15]]);
  }));

  return function addComment(_x9, _x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Gets comments from a product according a product id.
 *
 * @param {string} productId String that represents a product id.
 */


exports.addComment = addComment;

var comments = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(productId) {
    var _yield$getProductById, comments;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getProductById(productId);

          case 2:
            _yield$getProductById = _context7.sent;
            comments = _yield$getProductById.comments;
            return _context7.abrupt("return", comments);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function comments(_x12) {
    return _ref8.apply(this, arguments);
  };
}();

exports.comments = comments;